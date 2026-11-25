import {
  ContactSection,
  CredentialsSection,
  ExperienceSection,
  HeroSection,
  MetricsSection,
  ResearchSection,
} from '@/components/portfolio-sections';
import { ProjectsSection } from '@/components/projects-section';
import { PROFILE } from '@/data/profile';

export default function HomePage() {
  return (
    <>
      <HeroSection profile={PROFILE} />
      <MetricsSection metrics={PROFILE.metrics} />
      <ProjectsSection projects={PROFILE.projects} />
      <ResearchSection research={PROFILE.research} />
      <ExperienceSection experience={PROFILE.experience} />
      <CredentialsSection profile={PROFILE} />
      <ContactSection profile={PROFILE} />
    </>
  );
}
