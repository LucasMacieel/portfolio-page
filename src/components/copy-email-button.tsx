'use client';

import { useEffect, useRef, useState } from 'react';
import { CopyIcon } from './icons';
import { BUTTON_CLASSES } from './ui-classes';

interface CopyEmailButtonProps {
  readonly email: string;
}

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    let didCopy = false;

    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(email);
        didCopy = true;
      } catch {
        didCopy = false;
      }
    }

    if (!didCopy) {
      const helper = document.createElement('textarea');
      helper.value = email;
      helper.setAttribute('readonly', '');
      helper.style.position = 'absolute';
      helper.style.left = '-9999px';
      document.body.appendChild(helper);
      helper.select();
      didCopy = document.execCommand('copy');
      document.body.removeChild(helper);
    }

    if (didCopy) {
      setCopied(true);
      setStatusMessage(`${email} copied to clipboard.`);
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
        timeoutRef.current = null;
      }, 2000);
    } else {
      setStatusMessage(`Unable to copy automatically. Email is ${email}.`);
    }
  };

  return (
    <>
      <button
        type="button"
        className={BUTTON_CLASSES.secondary}
        data-copy-email={email}
        onClick={handleCopy}
      >
        <CopyIcon />
        <span>{copied ? 'Copied' : 'Copy email'}</span>
      </button>
      <p id="copy-status" className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </p>
    </>
  );
}
