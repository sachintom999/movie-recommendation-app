"use client";

import { useState, useEffect } from "react";
import {
  Film,
  Clock,
  Star,
  Calendar,
  Bookmark,
  BookmarkCheck,
  Share2,
  Sun,
  Moon,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAlertDialog } from "@/context/AlertDialogContext";

// Sample movie database
const movieDatabase = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    genre: "Drama",
    duration: 142,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    rating: 9.3,
    year: 1994,
    languages: ["English", "Spanish"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    duration: 152,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    rating: 9.0,
    year: 2008,
    languages: ["English", "French", "German"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 3,
    title: "Inception",
    genre: "Sci-Fi",
    duration: 148,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    rating: 8.8,
    year: 2010,
    languages: ["English", "Japanese"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    genre: "Crime",
    duration: 154,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    rating: 8.9,
    year: 1994,
    languages: ["English", "Spanish", "French"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Fantasy",
    duration: 178,
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    rating: 8.8,
    year: 2001,
    languages: ["English", "Spanish", "French", "German"],
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 6,
    title: "Parasite",
    genre: "Drama",
    duration: 132,
    description:
      "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    rating: 8.6,
    year: 2019,
    languages: ["Korean", "English"],
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 7,
    title: "Get Out",
    genre: "Horror",
    duration: 104,
    description:
      "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
    rating: 7.7,
    year: 2017,
    languages: ["English", "Spanish"],
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 8,
    title: "The Grand Budapest Hotel",
    genre: "Comedy",
    duration: 99,
    description:
      "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
    rating: 8.1,
    year: 2014,
    languages: ["English", "French", "German"],
    director: "Wes Anderson",
    cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 9,
    title: "La La Land",
    genre: "Musical",
    duration: 128,
    description:
      "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    rating: 8.0,
    year: 2016,
    languages: ["English", "French"],
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 10,
    title: "Toy Story",
    genre: "Animation",
    duration: 81,
    description:
      "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
    rating: 8.3,
    year: 1995,
    languages: ["English", "Spanish", "French", "Italian"],
    director: "John Lasseter",
    cast: ["Tom Hanks", "Tim Allen", "Don Rickles"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 11,
    title: "The Godfather",
    genre: "Crime",
    duration: 175,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: 9.2,
    year: 1972,
    languages: ["English", "Italian"],
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
  {
    id: 12,
    title: "Spirited Away",
    genre: "Animation",
    duration: 125,
    description:
      "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    rating: 8.6,
    year: 2001,
    languages: ["Japanese", "English"],
    director: "Hayao Miyazaki",
    cast: ["Daveigh Chase", "Suzanne Pleshette", "Miyu Irino"],
    imageUrl: "/placeholder.svg?height=150&width=250",
  },
];

// Available genres
const genres = [
  "Action",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Musical",
  "Sci-Fi",
];

// Available languages
const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Korean",
];

// Year ranges
const yearRanges = [
  { label: "All Years", value: "all" },
  { label: "Before 1980", value: "before1980" },
  { label: "1980s", value: "1980s" },
  { label: "1990s", value: "1990s" },
  { label: "2000s", value: "2000s" },
  { label: "2010s", value: "2010s" },
  { label: "2020s", value: "2020s" },
];

export default function MovieRecommendationCard() {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [availableTime, setAvailableTime] = useState<number>(120);
  const [minRating, setMinRating] = useState<number>(7);
  const [yearRange, setYearRange] = useState<string>("all");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("English");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [watchlist, setWatchlist] = useState<any[]>([]);
  const [expandedMovieId, setExpandedMovieId] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>("rating");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("recommendations");
  const { showDialog } = useAlertDialog();

  const itemsPerPage = 3;

  // UI Element 7: Theme Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Filter movies based on all criteria
  const filterMovies = () => {
    const filteredMovies = movieDatabase.filter((movie) => {
      // Genre filter
      const genreMatch = selectedGenre ? movie.genre === selectedGenre : true;

      // Duration filter
      const durationMatch = movie.duration <= availableTime;

      // Rating filter
      const ratingMatch = movie.rating >= minRating;

      // Year range filter
      let yearMatch = true;
      if (yearRange !== "all") {
        if (yearRange === "before1980") {
          yearMatch = movie.year < 1980;
        } else if (yearRange === "1980s") {
          yearMatch = movie.year >= 1980 && movie.year < 1990;
        } else if (yearRange === "1990s") {
          yearMatch = movie.year >= 1990 && movie.year < 2000;
        } else if (yearRange === "2000s") {
          yearMatch = movie.year >= 2000 && movie.year < 2010;
        } else if (yearRange === "2010s") {
          yearMatch = movie.year >= 2010 && movie.year < 2020;
        } else if (yearRange === "2020s") {
          yearMatch = movie.year >= 2020;
        }
      }

      // Language filter
      const languageMatch = movie.languages.includes(selectedLanguage);

      return (
        genreMatch && durationMatch && ratingMatch && yearMatch && languageMatch
      );
    });

    // UI Element 6: Sort options
    if (sortBy === "rating") {
      filteredMovies.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "year-new") {
      filteredMovies.sort((a, b) => b.year - a.year);
    } else if (sortBy === "year-old") {
      filteredMovies.sort((a, b) => a.year - b.year);
    } else if (sortBy === "duration-short") {
      filteredMovies.sort((a, b) => a.duration - b.duration);
    } else if (sortBy === "duration-long") {
      filteredMovies.sort((a, b) => b.duration - a.duration);
    }

    return filteredMovies;
  };

  // UI Element 1: Find Movies Button
  const handleFindMovies = () => {
    const filteredMovies = filterMovies();
    setRecommendations(filteredMovies);
    setCurrentPage(1);
    setHasSearched(true);
    setActiveTab("recommendations");
  };

  // UI Element 2: Clear Filters
  const handleClearFilters = () => {
    setSelectedGenre("");
    setAvailableTime(120);
    setMinRating(7);
    setYearRange("all");
    setSelectedLanguage("English");
    setSortBy("rating");
    toast({
      title: "Filters cleared",
      description: "All filters have been reset to default values",
    });
  };

  // UI Element 3: Add to Watchlist
  const handleToggleWatchlist = (movie: any) => {
    let undo = false;
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);

    if (isInWatchlist) {
      // Remove from watchlist
      setWatchlist(watchlist.filter((item) => item.id !== movie.id));

      const toastInstance = toast({
        title: "Removed from watchlist",
        description: `"${movie.title}" has been removed from your watchlist`,
        action: (
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              undo = true;
              setWatchlist((prev) => [...prev, movie]); // ✅ Restore the movie
              toastInstance.dismiss();
            }}
          >
            Undo
          </Button>
        ),
      });

      // If undo is not clicked within 5 seconds, confirm deletion
      setTimeout(() => {
        if (!undo) {
        }
      }, 5000);
    } else {
      // Add to watchlist
      setWatchlist([...watchlist, movie]);

      toast({
        title: "Added to watchlist",
        description: `"${movie.title}" has been added to your watchlist`,
      });
    }
  };

  // UI Element 4: Expand Movie Details
  const handleToggleExpand = (movieId: number) => {
    if (expandedMovieId === movieId) {
      setExpandedMovieId(null);
    } else {
      setExpandedMovieId(movieId);
    }
  };

  // UI Element 5: Share Movie
  const handleShareMovie = (movie: any) => {
    const movieLink = `https://imdb.com/movies/${movie.id}`;

    navigator.clipboard
      .writeText(movieLink)
      .then(() => {
        toast({
          title: "Share the movie",
          description: `Link to "${movie.title}" copied to clipboard`,
        });
      })
      .catch(() => {
        toast({
          title: "Failed to copy",
          description: "Something went wrong. Please try again.",
        });
      });
  };

  // UI Element 8: Pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Calculate pagination
  const totalPages = Math.ceil(recommendations.length / itemsPerPage);
  const paginatedMovies = recommendations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary/5">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Film className="h-5 w-5" />
              <span className="text-xl md:text-2xl">Movie Recommendations</span>
            </CardTitle>

            {/* UI Element 7: Theme Toggle */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="ml-auto"
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle {isDarkMode ? "light" : "dark"} mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <CardDescription>
            Find the perfect movie based on your preferences
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select Genre</label>
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Genre</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Available Time</label>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatTime(availableTime)}
                  </span>
                </div>
                <Slider
                  value={[availableTime]}
                  min={60}
                  max={240}
                  step={5}
                  onValueChange={(value) => setAvailableTime(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1h</span>
                  <span>2h</span>
                  <span>3h</span>
                  <span>4h</span>
                </div>
              </div>

              {/* UI Element 9: Minimum Rating Filter */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Minimum Rating</label>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    {minRating.toFixed(1)}+
                  </span>
                </div>
                <Slider
                  value={[minRating]}
                  min={1}
                  max={10}
                  step={0.1}
                  onValueChange={(value) => setMinRating(value[0])}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>5</span>
                  <span>10</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* UI Element 10: Year Range Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Release Period</label>
                <Select value={yearRange} onValueChange={setYearRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year range" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearRanges.map((range) => (
                      <SelectItem key={range.value} value={range.value}>
                        {range.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* UI Element 11: Language Preference */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Select
                  value={selectedLanguage}
                  onValueChange={setSelectedLanguage}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* UI Element 6: Sort Options */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Sort Results By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="year-new">Newest First</SelectItem>
                    <SelectItem value="year-old">Oldest First</SelectItem>
                    <SelectItem value="duration-short">
                      Shortest First
                    </SelectItem>
                    <SelectItem value="duration-long">Longest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            {/* UI Element 1: Find Movies Button */}
            <Button onClick={handleFindMovies} className="flex-1">
              <Filter className="mr-2 h-4 w-4" />
              Find Movies
            </Button>

            {/* UI Element 2: Clear Filters Button */}
            <Button variant="outline" onClick={handleClearFilters}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>

        {hasSearched && (
          <CardFooter className="flex-col border-t p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recommendations" >
                  Recommendations ({recommendations.length})
                </TabsTrigger>
                <TabsTrigger value="watchlist">
                  My Watchlist ({watchlist.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="p-4">
                {recommendations.length > 0 ? (
                  <>
                    <div className="space-y-4">
                      {paginatedMovies.map((movie) => (
                        <div
                          key={movie.id}
                          className="border rounded-md p-3 bg-card"
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full md:w-1/4">
                              <img
                                src={movie.imageUrl || "/placeholder.svg"}
                                alt={movie.title}
                                className="w-full h-auto rounded-md object-cover"
                              />
                            </div>
                            <div className="w-full md:w-3/4">
                              <div className="flex justify-between items-start">
                                <h4 className="font-semibold text-lg">
                                  {movie.title}
                                </h4>
                                <div className="flex items-center gap-1 text-yellow-500">
                                  <Star className="h-4 w-4 fill-yellow-500" />
                                  <span>{movie.rating.toFixed(1)}</span>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-2 my-2">
                                <Badge variant="outline">{movie.genre}</Badge>
                                <Badge
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  <Clock className="h-3 w-3" />
                                  {formatTime(movie.duration)}
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className="flex items-center gap-1"
                                >
                                  <Calendar className="h-3 w-3" />
                                  {movie.year}
                                </Badge>
                              </div>

                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {movie.description}
                              </p>

                              {/* UI Element 4: Expand Movie Details */}
                              {expandedMovieId === movie.id && (
                                <div className="mt-3 text-sm border-t pt-3">
                                  <p>
                                    <span className="font-semibold">
                                      Director:
                                    </span>{" "}
                                    {movie.director}
                                  </p>
                                  <p>
                                    <span className="font-semibold">Cast:</span>{" "}
                                    {movie.cast.join(", ")}
                                  </p>
                                  <p>
                                    <span className="font-semibold">
                                      Languages:
                                    </span>{" "}
                                    {movie.languages.join(", ")}
                                  </p>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-2 mt-3">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleToggleExpand(movie.id)}
                                >
                                  {expandedMovieId === movie.id
                                    ? "Show Less"
                                    : "Show More"}
                                </Button>

                                {/* UI Element 3: Add to Watchlist */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleToggleWatchlist(movie)}
                                >
                                  {watchlist.some(
                                    (item) => item.id === movie.id
                                  ) ? (
                                    <>
                                      <BookmarkCheck className="mr-1 h-4 w-4" />
                                      In Watchlist
                                    </>
                                  ) : (
                                    <>
                                      <Bookmark className="mr-1 h-4 w-4" />
                                      Add to Watchlist
                                    </>
                                  )}
                                </Button>

                                {/* UI Element 5: Share Movie */}
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleShareMovie(movie)}
                                >
                                  <Share2 className="mr-1 h-4 w-4" />
                                  Share
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* UI Element 8: Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-2 mt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-sm">
                          Page {currentPage} of {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No movies match your criteria
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={handleClearFilters}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="watchlist" className="p-4">
                {watchlist.length > 0 ? (
                  <div className="space-y-4">
                    {watchlist.map((movie) => (
                      <div
                        key={movie.id}
                        className="border rounded-md p-3 bg-card"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          <div className="w-full md:w-1/4">
                            <img
                              src={movie.imageUrl || "/placeholder.svg"}
                              alt={movie.title}
                              className="w-full h-auto rounded-md object-cover"
                            />
                          </div>
                          <div className="w-full md:w-3/4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-semibold text-lg">
                                {movie.title}
                              </h4>
                              <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="h-4 w-4 fill-yellow-500" />
                                <span>{movie.rating.toFixed(1)}</span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 my-2">
                              <Badge variant="outline">{movie.genre}</Badge>
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <Clock className="h-3 w-3" />
                                {formatTime(movie.duration)}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="flex items-center gap-1"
                              >
                                <Calendar className="h-3 w-3" />
                                {movie.year}
                              </Badge>
                            </div>

                            <p className="text-sm text-muted-foreground mt-1">
                              {movie.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                              <Button
                                className="hover:bg-red-100"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  showDialog({
                                    title: "Remove movie from watchlist?",
                                    description:
                                      "Are you sure you want to remove this movie from your watchlist?",
                                    onConfirm: () => {
                                      handleToggleWatchlist(movie);
                                    },
                                  })
                                }
                              >
                                <X className="mr-1 h-4 w-4" />
                                Remove from Watchlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      Your watchlist is empty
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Add movies to your watchlist to keep track of what you
                      want to watch
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
