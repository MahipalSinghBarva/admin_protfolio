import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  SheetContent,
  SheetTitle,
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clearAllUserErrors, logoutUser } from "@/store/slices/userSlices";
import {
  Code,
  FolderGit,
  History,
  Home,
  Layout,
  LogOut,
  MailPlus,
  Package,
  Package2,
  PanelLeft,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dashboard from "./sub-component/Dashboard";
import AddSkill from "./sub-component/AddSkill";
import AddTimeline from "./sub-component/AddExperience";
import Message from "./sub-component/Message";
import Account from "./sub-component/Account";
import AddApplication from "./sub-component/AddApplication";
import AddProject from "./sub-component/AddProject";
import AddExperience from "./sub-component/AddExperience";



const useTypewriter = (text, speed = 100) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval); 
      }
    }, speed);

    return () => clearInterval(interval); 
    
  }, [text, speed]);

  return displayedText;
};

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [active, setActive] = useState("");

  const { isAuthenticated, error, user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logout Done");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const fullName = useTypewriter(user.fullName || "Welcome", 150);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 hidden w-14 flex-col border-r bg-background sm:flex z-50">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link className="group flex h-p w-p shrink-0 items-center justify-center gap-2 rounded-full">
              <Package className="h-6 w-6 transition-all group-hover:scale-110" />
              <span className="sr-only">Dashboard</span>
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 items-center justify-center rounded-lg ${
                      active === "Dashboard"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive(" Project")}
                  >
                    <Home className="w-5 h-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Dashboard</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 items-center justify-center rounded-lg ${
                      active === "Add Project"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Project")}
                  >
                    <FolderGit className="w-5 h-5" />
                    <span className="sr-only">Add Project</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Add Project</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 items-center justify-center rounded-lg ${
                      active === "Add Skill"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Skill")}
                  >
                    <Code className="w-5 h-5" />
                    <span className="sr-only">Add Skills</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Add Skill</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 items-center justify-center rounded-lg ${
                      active === "Add Application"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Application")}
                  >
                    <Layout className="w-5 h-5" />
                    <span className="sr-only">Add Application</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Add Application</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 items-center justify-center rounded-lg ${
                      active === "Add Timeline"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Add Experience")}
                  >
                    <History className="w-5 h-5" />
                    <span className="sr-only">Add Experience</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Add Experience</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 items-center justify-center rounded-lg ${
                      active === "Messages"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Messages")}
                  >
                    <MailPlus className="w-5 h-5" />
                    <span className="sr-only">Messages </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right"> Messages</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 items-center justify-center rounded-lg ${
                      active === "Account"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={() => setActive("Account")}
                  >
                    <User className="w-5 h-5" />
                    <span className="sr-only">Account </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right"> Account</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>

          <nav className="mt-auto flex-col items-center px-2 py-4 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={`flex h-9 items-center justify-center rounded-lg ${
                      active === "Logout"
                        ? "text-accent-foreground bg-accent"
                        : "text-muted-foreground"
                    } transition-colors hover:text-foreground md:h-8 md:w-8`}
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="sr-only">Logout </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right"> Logout</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </aside>

        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 max-[900px]:h-[100px]">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toogle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  className={`group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground border border-8 md:text-base`}
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Dashboard"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Dashboard")}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Project"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Project")}
                >
                  <FolderGit className="h-5 w-5" />
                  Add Project
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Skill"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Skill")}
                >
                  <Code className="h-5 w-5" />
                  Add Skill
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Application"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Application")}
                >
                  <Layout className="h-5 w-5" />
                  Add Application
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Account"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Account")}
                >
                  <User className="h-5 w-5" />
                  Account
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Add Experience"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Add Experience")}
                >
                  <History className="h-5 w-5" />
                  Add Experience
                </Link>
                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 ${
                    active === "Messages"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setActive("Messages")}
                >
                  <MailPlus className="h-5 w-5" />
                  Messages
                </Link>

                <Link
                  href="#"
                  className={`flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground`}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="flex items-center gap-4 md:grow-0 sm:ml-16 sm:mt-5">
            <motion.img
              src={user && user.avatar && user.avatar.url}
              alt="avatar"
              className="w-20 h-20 rounded-full max-[900px]:hidden"
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut",  }}
            />
            <motion.h1
              className="text-3xl max-[900px]:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              Welcome, {fullName} 
              <motion.span
                className="blinking-cursor" 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}  
                transition={{ duration: 1, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.h1>
          </div>
        </header>

        {(() => {
          switch (active) {
            case "Dashboard":
              return <Dashboard />;
              break;
            case "Add Project":
              return <AddProject />;
              break;
            case "Add Skill":
              return <AddSkill />;
              break;
            case "Add Application":
              return <AddApplication />;
              break;
            case "Add Experience":
              return <AddExperience />;
              break;
            case "Messages":
              return <Message />;
              break;
            case "Account":
              return <Account />;
              break;
            default:
              return <Dashboard />;
              break;
          }
        })()}
      </div>
    </>
  );
};

export default HomePage;
