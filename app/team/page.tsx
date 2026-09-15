 
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Mail, Facebook, Instagram } from "lucide-react";

const teamMembers = [
  {
    name: "Daniel Amogu",
    role: "Founder & Executive Director",
    image: "/team/daniel-amogu.jpeg",
    bio: "Pharmacist and Environmental Technologist dedicated to advancing asthma awareness, clean air advocacy, access to life-saving medication, and better asthma care across Nigeria.",
    email: "theofascommunity@gmail.com",
    facebook: "https://www.facebook.com/amogu2?mibextid=rS40aB7S9Ucbxw6v",
    instagram:
      "https://www.instagram.com/daniel.amogu?stkn=MW5vOG16NHhoYmh6cA==",
  },
  {
    name: "Abasiikponke David Alexander",
    role: "Human Resources Manager",
    image: "/team/david-alex.jpeg",
    bio: "Oversees volunteer recruitment, onboarding, team coordination, leave management, and professional development to strengthen the OFAS volunteer workforce.",
    email: "theofascommunity@gmail.com",
    facebook:
      "https://www.facebook.com/abas.alexander.2025?mibextid=rS40aB7S9Ucbxw6v",
    instagram:
      "https://www.instagram.com/abasiikponkedavid?stkn=ejRweWpma3Jka2wx",
  },
  {
    name: "Felix Efe Okpotor",
    role: "Communications & Member Support Team Lead",
    image: "/team/felix-efe.jpeg",
    bio: "Leads communications and member support, fostering connection, engagement, and a welcoming community where every OFAS member feels supported and valued.",
    email: "theofascommunity@gmail.com",
    facebook: "https://www.facebook.com/wealthfelix?mibextid=rS40aB7S9Ucbxw6v",
    instagram:
      "https://www.instagram.com/iamwealth_12?stkn=enE0azNlamdwbnU2",
  },
  {
    name: "Kuyik-Abasi Emmanuel Okon",
    role: "Community Engagement Lead",
    image: "/team/emma-okon.jpeg",
    bio: "Coordinates community activities and volunteer responsibilities, ensuring effective participation, accountability, and the successful delivery of assigned tasks.",
    email: "theofascommunity@gmail.com",
    facebook:
      "https://www.facebook.com/kelly.okon.54?mibextid=rS40aB7S9Ucbxw6v",
    instagram:
      "https://www.instagram.com/kuyik_abasi?stkn=MzJyZWJmcmwyaGI0",
  },
  {
    name: "Chibruoma Frank",
    role: "Outreach Team Lead",
    image: "/team/frank.jpeg",
    bio: "Leads outreach activities, builds strategic partnerships, and coordinates initiatives that promote asthma awareness, health education, and meaningful community impact.",
    email: "theofascommunity@gmail.com",
    facebook:
      "https://www.facebook.com/profile.php?id=61583552693956&mibextid=rS40aB7S9Ucbxw6v",
    instagram:
      "https://www.instagram.com/frankchibruomadike?stkn=dHRldHFrczZ3cWxv",
  },
  {
    name: "Enamudu Love Adele",
    role: "Volunteer Team Head",
    image: "/team/love-ade.jpeg",
    bio: "Coordinates volunteers, programs, and community activities that strengthen asthma awareness, education, support, and the overall impact of OFAS initiatives.",
    email: "theofascommunity@gmail.com",
    facebook: "#",
    instagram:
      "https://www.instagram.com/symply_jameel?stkn=emhpaHE5cTBkbjUw",
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <section className="py-12 sm:py-14 lg:py-16">
        <Container>
          {/* INTRO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto mb-9 max-w-2xl text-center sm:mb-10"
          >
            <h1 className="text-4xl font-semibold text-gray-900 sm:text-5xl dark:text-white">
              Meet Our Team
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base dark:text-gray-400">
              Behind every OFAS initiative is a dedicated team committed to
              supporting people living with asthma, raising awareness, and
              building a stronger and healthier community.
            </p>
          </motion.div>

          {/* TEAM GRID */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, index) => (
              <motion.article
                key={`${member.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                  ease: "easeOut",
                }}
                whileHover={{ y: -3 }}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-sky-200 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-sky-800"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* SOCIAL ICONS */}
                  <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 translate-y-2 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Facebook`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/90 text-gray-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:text-sky-600"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>

                    {/* <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/90 text-gray-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:text-sky-600"
                    >
                      <Mail className="h-4 w-4" />
                    </a> */}

                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on Instagram`}
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/90 text-gray-700 shadow-md backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:bg-white hover:text-sky-600"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h2 className="text-base font-semibold tracking-tight text-gray-900 dark:text-white">
                    {member.name}
                  </h2>

                  <p className="mt-0.5 text-xs font-medium text-sky-600 dark:text-sky-400">
                    {member.role}
                  </p>

                  <p className="mt-2.5 text-justify text-xs leading-5 text-gray-600 dark:text-gray-400">
                    {member.bio}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
 
