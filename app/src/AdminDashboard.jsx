import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import {
    LogOut,
    Star,
    Bookmark, // Used for the "Bookmarks" stat card
    BookOpen,
    BarChart2,
    TrendingUp,
    ThumbsUp,
    AlertCircle,
    MessageSquare,
    Clock,
    Users, 
    FileText, 
} from "lucide-react";
import dostLogo from "./components/images/dost-logo.png";

const AdminDashboard = () => {
    const navigate = useNavigate();

    // Mock statistics
    const stats = {
        totalViews: 47892,
        bookmarks: 3264,
        activeUsers: 2847,
        citations: 8743,
        relatedPapers: 12459,
        totalTheses: 15692,
        avgSession: 4.2,
    };

    // Mock data for new sections
    const MOCK_POPULAR_SEARCHES = [
        'AI Ethics in Philippine Education',
        'COVID-19 Impact on Local Fisheries',
        'Geothermal Energy Innovations',
        'E-Government Implementation',
        'Indigenous Language Preservation',
    ];

    const MOCK_RELATED_PAPERS_LIST = [
        { id: 1, title: 'AI and Robotics for Agriculture', count: '12,459' },
        { id: 2, title: 'Sustainable Development Goals in PH', count: '8,700' },
        { id: 3, title: 'Microplastic Pollution in Manila Bay', count: '5,600' },
        { id: 4, title: 'Digital Transformation of SMEs', count: '3,200' },
    ];
    
    // Mock monitoring & feedback
    const monitoring = [
        { label: "System Uptime", value: "98.7%", color: "text-green-600", icon: <TrendingUp /> },
        { label: "Active Feedback", value: "102", color: "text-blue-600", icon: <MessageSquare /> },
        { label: "Pending Issues", value: "1", color: "text-yellow-600", icon: <AlertCircle /> },
        { label: "System Rating", value: "5.0", color: "text-purple-600", icon: <Star /> },
    ];

    // Mock feedback
    const feedbackList = [
        { id: 1, message: "Database query timeout on user search", date: "2 days ago" },
        { id: 2, message: "System monitoring integrated with user tracking", date: "3 days ago" },
        { id: 3, message: "User suggestion: Add dark mode toggle", date: "1 week ago" },
    ];

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
            {/* Header */}
            <div className="bg-[#1F1F1F] text-white p-4 shadow-md">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <img src={dostLogo} alt="DOST SciNet-Phil Logo" className="h-12 w-50" />
                        <div className="text-xl font-bold">DOST UNION CATALOG</div>
                        <div className="text-sm border-l border-white pl-4 ml-4">
                            LitPath AI: <br /> Smart PathFinder of Theses and Dissertation
                        </div>
                    </div>
                    <nav className="flex space-x-6 items-center">
                        <a
                            href="http://scinet.dost.gov.ph/#/opac"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-200 transition-colors"
                        >
                            Online Public Access Catalog
                        </a>
                        {/* Using Link for home page redirection as requested */}
                        <Link
                            to="/"
                            className="font-bold text-blue-200 hover: transition-colors"
                        >
                            LitPath AI
                        </Link>
                    </nav>
                </div>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 max-w-7xl mx-auto w-full p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Welcome back, Librarian!</h1>

                {/* Top Charts and Lists */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Daily Activity Trend (Mock Chart) */}
                    <div className="bg-white p-6 rounded-xl shadow-lg lg:col-span-2">
                        <h2 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                            <BarChart2 className="text-blue-600" /> <span>Daily Activity Trends</span>
                        </h2>
                        <div className="h-40 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-gray-500">
                            [Activity Chart Placeholder]
                        </div>
                    </div>

                    {/* Most Cited Theses */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                            <BookOpen className="text-indigo-600" /> <span>Most Cited Theses</span>
                        </h2>
                        <ul className="text-sm space-y-2 text-gray-700">
                            <li>1. Deep Learning Applications in Medical Imaging</li>
                            <li>2. Renewable Energy Optimization Models</li>
                            <li>3. Blockchain Integration in Supply Chain Management</li>
                            <li>4. Climate Change Adaptation Policies</li>
                            <li>5. Advanced Natural Language Systems</li>
                        </ul>
                    </div>
                </div>
                
                {/* NEW: Popular Searches Panel (Updated to take full width) */}
                {/* Changed the outer grid from lg:grid-cols-2 to grid-cols-1 */}
                <div className="grid grid-cols-1 gap-6 mb-8">
                    {/* Popular Searches */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                            <TrendingUp className="text-red-500" /> <span>Popular Searches</span>
                        </h2>
                        <ul className="text-sm space-y-2 text-gray-700">
                            {MOCK_POPULAR_SEARCHES.map((search, index) => (
                                <li key={index} className="flex justify-between items-center border-b border-gray-100 pb-1">
                                    <span className="font-medium">
                                        {index + 1}. {search}
                                    </span>
                                    <span className="text-xs text-gray-400">({Math.floor(Math.random() * 500) + 50} hits)</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Stats Row - MODIFIED for icon change and grouping */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    <StatCard label="Total Views" value={stats.totalViews} icon={<EyeIcon />} />
                    <StatCard label="Bookmarks" value={stats.bookmarks} icon={<Bookmark />} />
                    <StatCard label="Citation Clicks" value={stats.citations} icon={<BookOpen />} /> 
                    <StatCard label="Related Papers" value={stats.relatedPapers} icon={<FileIcon />} />
                    {/* The GroupedStatCard spans 2 columns on all sizes for responsiveness */}
                    <GroupedStatCard stats={stats} />
                </div>

                {/* System Monitoring */}
                <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        System Monitoring & Feedback
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {monitoring.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center bg-gray-50 rounded-lg p-4 shadow-sm"
                            >
                                <div className={`${item.color} mb-2`}>{item.icon}</div>
                                <p className="text-lg font-bold text-gray-800">{item.value}</p>
                                <p className="text-sm text-gray-500">{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feedback Volume Trends (Mock Chart) + Recent Feedback */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Feedback Chart Placeholder */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                            <TrendingUp className="text-green-600" /> <span>Feedback Volume Trends</span>
                        </h2>
                        <div className="h-48 bg-gradient-to-r from-green-100 to-green-200 rounded-lg flex items-center justify-center text-gray-500">
                            [Feedback Chart Placeholder]
                        </div>
                    </div>

                    {/* Recent Feedback */}
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <h2 className="font-semibold text-gray-700 mb-3 flex items-center space-x-2">
                            <MessageSquare className="text-indigo-600" /> <span>Recent Feedback & Issues</span>
                        </h2>
                        <ul className="text-sm space-y-3">
                            {feedbackList.map((fb) => (
                                <li
                                    key={fb.id}
                                    className="border-b border-gray-100 pb-2 last:border-none text-gray-700"
                                >
                                    <p className="font-medium">{fb.message}</p>
                                    <p className="text-xs text-gray-500">{fb.date}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <div className="fixed bottom-8 right-8 z-50">
                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full hover:bg-red-700 transition-all shadow-xl font-semibold text-lg"
                >
                    <LogOut size={20} />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

// NEW: Grouped Stat Card - Updated for responsiveness
const GroupedStatCard = ({ stats }) => (
    // Added col-span-2 to ensure it spans two columns on all sizes (grid-cols-2, md:grid-cols-3, lg:grid-cols-6)
    <div className="bg-white rounded-xl shadow-md p-4 col-span-2 lg:col-span-2 flex flex-col justify-between">
        <div className="text-xs font-bold text-gray-700 mb-2 border-b pb-1">Operational Summary</div>
        <div className="grid grid-cols-3 divide-x divide-gray-200">
            {/* Active Users */}
            <div className="flex flex-col items-center justify-center px-1">
                <div className="text-blue-600 mb-1"><Users size={20} /></div>
                <p className="text-xl font-bold text-gray-800">{stats.activeUsers}</p>
                <p className="text-xs text-gray-500 text-center">Active Users</p>
            </div>
            {/* Total Thesis */}
            <div className="flex flex-col items-center justify-center px-1">
                <div className="text-green-600 mb-1"><BookOpen size={20} /></div>
                <p className="text-xl font-bold text-gray-800">{stats.totalTheses}</p>
                <p className="text-xs text-gray-500 text-center">Total Theses</p>
            </div>
            {/* Avg. Session Duration (min) */}
            <div className="flex flex-col items-center justify-center px-1">
                <div className="text-yellow-600 mb-1"><Clock size={20} /></div>
                <p className="text-xl font-bold text-gray-800">{stats.avgSession}</p>
                <p className="text-xs text-gray-500 text-center">Avg Session (min)</p>
            </div>
        </div>
    </div>
);

// Reusable Stat Card (Remains unchanged)
const StatCard = ({ label, value, icon }) => (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center">
        <div className="text-gray-600 mb-2">{icon}</div>
        <p className="text-xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
    </div>
);

// Placeholder icons (Remains unchanged)
const EyeIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>;
const UsersIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-3-3.87"/><path d="M7 21v-2a4 4 0 013-3.87"/><path d="M12 7a4 4 0 110-8 4 4 0 010 8z"/><path d="M19 8a4 4 0 010 8"/></svg>;
const FileIcon = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>;

export default AdminDashboard;