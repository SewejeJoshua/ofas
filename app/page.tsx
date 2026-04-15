import { HeroSection } from "@/components/home/hero-section";
import { MissionSection } from "@/components/home/mission-section";
import { ImpactSection } from "@/components/home/impact-section";
import { NewsSection } from "@/components/home/news-section";
import {AboutPage} from "@/app/about/page";
import {ProgramsPage} from "@/app/programs/page";
import {ResourcesPage} from "@/app/resources/page";
import {CampusBasesPage} from "@/app/campus-bases/page";
import {ContactPage} from "@/app/contact/page";

export default function Home() {
  return (
    <div className="relative bg-gradient-to-b from-white via-blue-50/30 to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <HeroSection />
      <AboutPage />
      <ProgramsPage />
      <ResourcesPage/>
      <CampusBasesPage /> 
      <ContactPage/> 
       
      {/* <ImpactSection /> */}
       
    </div>
  );
}
