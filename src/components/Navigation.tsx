
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ChevronDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Text Tweaker</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1">
          <NavigationMenu className="mx-6">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    isActive("/") && "bg-accent/50"
                  )}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  isActive("/linkedin-formatter") || 
                  isActive("/bold-text") || 
                  isActive("/italic-text") || 
                  isActive("/online-text-underliner") ||
                  isActive("/big-text-converter") ||
                  isActive("/case-converter") ||
                  isActive("/article-formatting-tool") ||
                  isActive("/bubble-text-generator") && "bg-accent/50"
                )}>Text Formatting Tools</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li>
                      <Link to="/linkedin-formatter">
                        <NavigationMenuLink className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive("/linkedin-formatter") && "bg-accent"
                        )}>
                          <div className="text-sm font-medium leading-none">LinkedIn Formatter</div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Format your LinkedIn posts with advanced tools
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/bold-text">
                        <NavigationMenuLink className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive("/bold-text") && "bg-accent"
                        )}>
                          <div className="text-sm font-medium leading-none">Bold Text Generator</div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Create bold text for social media and more
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/italic-text">
                        <NavigationMenuLink className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive("/italic-text") && "bg-accent"
                        )}>
                          <div className="text-sm font-medium leading-none">Italic Text Generator</div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Create italic text for your content
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/online-text-underliner">
                        <NavigationMenuLink className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive("/online-text-underliner") && "bg-accent"
                        )}>
                          <div className="text-sm font-medium leading-none">Underline Text Generator</div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Create underlined text easily
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/big-text-converter">
                        <NavigationMenuLink className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive("/big-text-converter") && "bg-accent"
                        )}>
                          <div className="text-sm font-medium leading-none">Big Text Converter</div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Convert text to various large font styles
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/case-converter">
                        <NavigationMenuLink className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive("/case-converter") && "bg-accent"
                        )}>
                          <div className="text-sm font-medium leading-none">Case Converter</div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Convert text to uppercase, lowercase, title case & more
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/bubble-text-generator">
                        <NavigationMenuLink className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive("/bubble-text-generator") && "bg-accent"
                        )}>
                          <div className="text-sm font-medium leading-none">Bubble Text Generator</div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Create stylish bubble text for social media
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                    <li>
                      <Link to="/article-formatting-tool">
                        <NavigationMenuLink className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                          isActive("/article-formatting-tool") && "bg-accent"
                        )}>
                          <div className="text-sm font-medium leading-none">Article Formatting Tool</div>
                          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                            Format and optimize your articles with advanced tools
                          </p>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/about">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    isActive("/about") && "bg-accent/50"
                  )}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/contact">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    isActive("/contact") && "bg-accent/50"
                  )}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/blog">
                  <NavigationMenuLink className={cn(
                    "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
                    isActive("/blog") && "bg-accent/50"
                  )}>
                    Blog
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden flex-1 justify-end">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] flex flex-col">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-2 mt-4">
                <Link to="/" onClick={() => setOpen(false)} className={cn("text-left py-2 px-4 rounded-md hover:bg-accent", isActive("/") && "bg-accent")}>Home</Link>
                
                <div className="py-2 px-4 space-y-1">
                  <div className="flex items-center justify-between cursor-pointer group mb-2">
                    <span className="font-medium">Text Formatting Tools</span>
                    <ChevronDown className="h-4 w-4 group-data-[state=open]:rotate-180 transition-transform" />
                  </div>
                  <div className="ml-4 flex flex-col space-y-2">
                    <Link to="/linkedin-formatter" onClick={() => setOpen(false)} className={cn("py-2 px-2 rounded-md hover:bg-accent", isActive("/linkedin-formatter") && "bg-accent")}>LinkedIn Formatter</Link>
                    <Link to="/bold-text" onClick={() => setOpen(false)} className={cn("py-2 px-2 rounded-md hover:bg-accent", isActive("/bold-text") && "bg-accent")}>Bold Text Generator</Link>
                    <Link to="/italic-text" onClick={() => setOpen(false)} className={cn("py-2 px-2 rounded-md hover:bg-accent", isActive("/italic-text") && "bg-accent")}>Italic Text Generator</Link>
                    <Link to="/online-text-underliner" onClick={() => setOpen(false)} className={cn("py-2 px-2 rounded-md hover:bg-accent", isActive("/online-text-underliner") && "bg-accent")}>Underline Text Generator</Link>
                    <Link to="/big-text-converter" onClick={() => setOpen(false)} className={cn("py-2 px-2 rounded-md hover:bg-accent", isActive("/big-text-converter") && "bg-accent")}>Big Text Converter</Link>
                    <Link to="/case-converter" onClick={() => setOpen(false)} className={cn("py-2 px-2 rounded-md hover:bg-accent", isActive("/case-converter") && "bg-accent")}>Case Converter</Link>
                    <Link to="/bubble-text-generator" onClick={() => setOpen(false)} className={cn("py-2 px-2 rounded-md hover:bg-accent", isActive("/bubble-text-generator") && "bg-accent")}>Bubble Text Generator</Link>
                    <Link to="/article-formatting-tool" onClick={() => setOpen(false)} className={cn("py-2 px-2 rounded-md hover:bg-accent", isActive("/article-formatting-tool") && "bg-accent")}>Article Formatting Tool</Link>
                  </div>
                </div>
                
                <Link to="/about" onClick={() => setOpen(false)} className={cn("text-left py-2 px-4 rounded-md hover:bg-accent", isActive("/about") && "bg-accent")}>About</Link>
                <Link to="/contact" onClick={() => setOpen(false)} className={cn("text-left py-2 px-4 rounded-md hover:bg-accent", isActive("/contact") && "bg-accent")}>Contact</Link>
                <Link to="/blog" onClick={() => setOpen(false)} className={cn("text-left py-2 px-4 rounded-md hover:bg-accent", isActive("/blog") && "bg-accent")}>Blog</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
