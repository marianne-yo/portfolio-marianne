import Image from "next/image";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {GraduationCap, UserStar} from "lucide-react";
import { Montserrat } from "next/font/google";
import { Merriweather } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });
const merriweather = Merriweather({ subsets: ["latin"], weight: "400" });
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-amber-100">
      <main className="flex flex-1 w-full max-w-8xl max-h-xl flex-col items-center justify-between py-32 px-16 sm:items-start bg-amber-200">
        <header className="bg-blue-300 flex justify-center">
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">
                <GraduationCap />
                Professional
              </TabsTrigger>
              <TabsTrigger value="code">
                <UserStar />
                Personal
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </header>
        <h1 className="text-5xl font-bold tracking-tight text-center sm:text-left">
          Hi, my name is <span className="text-blue-600">Marianne</span>
        </h1>
        <p className="mt-4 text-2xl text-center sm:text-left">
          Explore my projects, skills, and experience in web development.
        </p>
      </main>
    </div>
  );
}
