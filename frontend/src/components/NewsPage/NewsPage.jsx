// Updated NewsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Tag,
  ArrowRight,
  Search,
  Filter,
  BookOpen,
  Video,
  Megaphone,
  CalendarDays,
  ChevronDown,
  Share2,
  Heart,
  Bookmark,
  Play,
  Building2,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";
import { toast } from "react-toastify";
import newsService from "../../Service/newsArticle.js";
import { useAuth } from "../../context/AuthContext";
import ConfirmationModal from "./ConfirmationModal";
import NewsForm from "./NewsForm";

const NewsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [expandedArticle, setExpandedArticle] = useState(null);
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();

  // Modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [articleToEdit, setArticleToEdit] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const categories = [
    { id: "all", label: "All News", icon: BookOpen },
    { id: "announcements", label: "Announcements", icon: Megaphone },
    { id: "events", label: "Events", icon: CalendarDays },
    { id: "development", label: "Development", icon: Building2 },
  ];

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await newsService.getNewsArticles();
      console.log("API Response:", response);
      if (response.success) {
        setNewsArticles(response.data);
        console.log("Total articles:", response.data.length);
        console.log(
          "Featured articles:",
          response.data.filter((article) => article.featured).length
        );
      } else {
        console.error("Failed to fetch news:", response.message);
        setNewsArticles([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setNewsArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setArticleToEdit(article);
    setIsEditing(true);
    setShowNewsForm(true);
  };

  const handleDeleteClick = (article) => {
    setArticleToDelete(article);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!articleToDelete) return;

    try {
      // Use the new method that deletes both news and image
      const response = await newsService.deleteNewsWithImage(
        articleToDelete.id,
        articleToDelete.image
      );

      if (response.success) {
        setNewsArticles((prev) =>
          prev.filter((item) => item.id !== articleToDelete.id)
        );
        toast.success("News article deleted successfully!");
      } else {
        toast.error("Failed to delete news article: " + response.message);
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      toast.error("Error deleting news article");
    } finally {
      setShowDeleteModal(false);
      setArticleToDelete(null);
    }
  };

  const handleAddNews = () => {
    setArticleToEdit(null);
    setIsEditing(false);
    setShowNewsForm(true);
  };

  const handleSaveNews = async (
    formData,
    imageFile = null,
    oldImageFilename = null
  ) => {
    try {
      let response;

      if (isEditing && articleToEdit) {
        // Check if image needs to be updated
        if (imageFile && oldImageFilename) {
          // Use the combined update method that handles image replacement
          response = await newsService.updateNewsWithImage(
            articleToEdit.id,
            formData,
            imageFile,
            oldImageFilename
          );
        } else {
          // Regular update without image change
          response = await newsService.updateNews({
            ...formData,
            id: articleToEdit.id,
          });
        }
      } else {
        // Add new news
        if (imageFile) {
          // Upload image first, then create news
          const imageResponse = await newsService.uploadImage(
            "news",
            imageFile
          );
          if (imageResponse.success) {
            response = await newsService.addNews({
              ...formData,
              image: imageResponse.url,
            });
          } else {
            throw new Error("Failed to upload image");
          }
        } else {
          response = await newsService.addNews(formData);
        }
      }

      if (response.success) {
        await fetchNews(); // Refresh the news list
        toast.success(
          isEditing ? "News updated successfully!" : "News added successfully!"
        );
      } else {
        toast.error(
          `Failed to ${isEditing ? "update" : "add"} news: ${response.message}`
        );
      }
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "adding"} news:`, error);
      toast.error(`Error ${isEditing ? "updating" : "adding"} news article`);
    }
  };

  // Get featured article for the featured section
  const featuredArticle = newsArticles.find((article) => article.featured);

  // Get all articles for the grid (including featured ones)
  const filteredArticles =
    activeCategory === "all"
      ? newsArticles
      : newsArticles.filter((article) => {
          const categoryMap = {
            Infrastructure: "development",
            Agriculture: "development",
            Announcement: "announcements",
            Culture: "events",
            Community: "events",
            Development: "development",
          };
          return categoryMap[article.category] === activeCategory;
        });

  console.log("Filtered articles count:", filteredArticles.length);

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const toggleExpandArticle = (id) => {
    if (expandedArticle === id) {
      setExpandedArticle(null);
    } else {
      setExpandedArticle(id);
    }
  };

  // Handle image URLs from API
  const getImageUrl = (imagePath) => {
    if (imagePath.startsWith("http")) return imagePath;
    if (imagePath.startsWith("blob:")) return imagePath;
    return `${"https://nadi-gibe-web-backend.onrender.com"}${imagePath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21203C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white">
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setArticleToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete News Article"
        message={`Are you sure you want to delete "${articleToDelete?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* News Form Modal */}
      <NewsForm
        isOpen={showNewsForm}
        onClose={() => {
          setShowNewsForm(false);
          setArticleToEdit(null);
          setIsEditing(false);
        }}
        onSave={handleSaveNews}
        newsData={articleToEdit}
        isEditing={isEditing}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1200&q=80)",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              News & Updates
            </h1>
            <p className="text-xl text-[#b0aef3] mb-8">
              Stay informed about the latest developments, events, and
              initiatives from Nadhii Gibee District Administration
            </p>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search news and updates..."
                className="w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-full py-3 px-5 text-white placeholder-[#21203C]/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <Search className="absolute right-3 top-3 text-white" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Add News Button for Authenticated Users */}
      {isAuthenticated() && (
        <section className="py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-end">
              <button
                onClick={handleAddNews}
                className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center shadow-lg hover:shadow-xl"
              >
                <Plus size={20} className="mr-2" />
                Add News
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Featured Article */}
      {featuredArticle && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-[#21203C]/20">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={getImageUrl(featuredArticle.image)}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#21203C] text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-1" />
                    {formatDate(featuredArticle.date)}
                    <span className="mx-2">•</span>
                    <span className="bg-[#21203C]/10 text-[#21203C] px-2 py-1 rounded-full text-xs">
                      {featuredArticle.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User size={16} className="text-gray-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {featuredArticle.author}
                      </span>
                    </div>
                    <button className="inline-flex items-center text-[#21203C] font-medium group">
                      Read Full Story
                      <ArrowRight
                        size={18}
                        className="ml-2 group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Controls */}
      <section className="py-8 bg-[#21203C]/20 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-[#21203C] text-white shadow-lg"
                        : "bg-white text-gray-700 hover:bg-[#21203C]/5"
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {category.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex bg-white rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === "grid"
                      ? "bg-[#21203C] text-white"
                      : "text-gray-700"
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md transition-colors duration-300 ${
                    viewMode === "list"
                      ? "bg-[#21203C] text-white"
                      : "text-gray-700"
                  }`}
                >
                  List View
                </button>
              </div>
              <button className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
                <Filter size={18} className="mr-2" />
                Filters
                <ChevronDown size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles found.</p>
            </div>
          ) : (
            <div
              className={`
                ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-6"
                }
              `}
            >
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className={`bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                    viewMode === "list" && "flex"
                  }`}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-1/3 h-48" : "h-48"
                    }`}
                  >
                    <img
                      src={getImageUrl(article.image)}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 flex items-center">
                      <div className="bg-[#21203C] text-white px-2 py-1 rounded-full text-xs font-medium">
                        {article.category}
                      </div>
                      {article.urgent && (
                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium ml-2">
                          URGENT
                        </div>
                      )}
                    </div>

                    {/* Edit/Delete buttons for authenticated users */}
                    {isAuthenticated() && (
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          onClick={() => handleEdit(article)}
                          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-lg"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(article)}
                          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-lg"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className={`p-5 ${viewMode === "list" && "w-2/3"}`}>
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(article.date)}
                      {article.location && (
                        <>
                          <span className="mx-2">•</span>
                          <MapPin size={14} className="mr-1" />
                          {article.location}
                        </>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-[#21203C]/10 text-[#21203C] text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <User size={14} className="text-gray-500 mr-1" />
                        <span className="text-sm text-gray-600">
                          {article.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="text-gray-500 hover:text-[#21203C]">
                          <Heart size={16} />
                          <span className="text-xs ml-1">
                            {article.likes || 0}
                          </span>
                        </button>
                        <button className="text-gray-500 hover:text-[#21203C]">
                          <Share2 size={16} />
                        </button>
                        <button className="text-gray-500 hover:text-[#21203C]">
                          <Bookmark size={16} />
                        </button>
                      </div>
                    </div>

                    {expandedArticle === article.id && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 mb-4">{article.content}</p>
                        <div className="flex justify-between items-center">
                          {/* Additional content can go here */}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => toggleExpandArticle(article.id)}
                      className="w-full mt-4 text-center text-[#21203C] font-medium flex items-center justify-center"
                    >
                      {expandedArticle === article.id
                        ? "Show Less"
                        : "Read More"}
                      <ChevronDown
                        size={16}
                        className={`ml-1 transition-transform duration-300 ${
                          expandedArticle === article.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center space-x-2">
              <button className="bg-[#21203C] text-white p-2 rounded-lg">
                1
              </button>
              <button className="bg-white text-gray-700 p-2 rounded-lg border border-gray-200 hover:bg-[#21203C]/5">
                2
              </button>
              <button className="bg-white text-gray-700 p-2 rounded-lg border border-gray-200 hover:bg-[#21203C]/5">
                3
              </button>
              <button className="bg-white text-gray-700 p-2 rounded-lg border border-gray-200 hover:bg-[#21203C]/5">
                Next
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] rounded-2xl mx-4 my-12 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Updated with Nadhii Gibee District
            </h2>
            <p className="text-[#b0aef3] mb-6">
              Subscribe to our newsletter to receive important announcements,
              news, and event invitations directly in your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-text-[#b0aef3] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-full transition-colors duration-300">
                Subscribe Now
              </button>
            </div>
            <p className="text-[#b0aef3] text-sm mt-4">
              We respect your privacy and will never share your information.
            </p>
          </div>
        </div>
      </section>

      {/* Archive Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              News <span className="text-[#21203C]">Archive</span>
            </h2>
            <p className="text-lg text-gray-600">
              Browse through our historical news and announcements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F5F4FF] rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#21203C] mb-2">2023</div>
              <p className="text-gray-600">Current year news and updates</p>
            </div>
            <div className="bg-[#F5F4FF] rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#21203C] mb-2">2022</div>
              <p className="text-gray-600">Previous year archives</p>
            </div>
            <div className="bg-[#F5F4FF] rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-[#21203C] mb-2">2021</div>
              <p className="text-gray-600">
                Historical records and announcements
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
