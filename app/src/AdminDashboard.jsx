// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Award, TrendingUp, BookOpen, Clock, Users, Database } from 'lucide-react';
import dostLogo from "./components/images/dost-logo.png"; // Assuming it's in src/components/images

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Title);

const AdminDashboard = () => {
    // Simulated Data (replace with API calls when you have a backend)
    const [dashboardData, setDashboardData] = useState({
        usageMetrics: {
            totalSearches: 47892,
            totalDocuments: 8743,
            totalReviews: 3264,
            totalResearchers: 12459,
        },
        dailyActivityTrends: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            data: [2500, 3200, 7800, 5500, 4100, 2000, 1500],
        },
        citationFormats: [
            { name: 'APA', count: 3500, percentage: '45%' },
            { name: 'MLA', count: 2400, percentage: '30%' },
            { name: 'Chicago', count: 1000, percentage: '12%' },
            { name: 'Harvard', count: 600, percentage: '8%' },
            { name: 'Others', count: 500, percentage: '5%' },
        ],
        thesisCategoriesDistribution: {
            labels: ['Computer Science', 'Environmental Science', 'Business', 'Education', 'Others'],
            data: [25, 22, 18, 15, 20], // Percentages
            colors: ['#4A90E2', '#7ED321', '#F5A623', '#BD10E0', '#9B9B9B'],
        },
        popularSearches: [
            { query: 'machine learning', count: '10,230 searches', trend: '+12%' },
            { query: 'climate change', count: '8,150 searches', trend: '+8%' },
            { query: 'artificial intelligence', count: '7,500 searches', trend: '+6%' },
            { query: 'data mining', count: '6,120 searches', trend: '+5%' },
            { query: 'renewable energy', count: '5,800 searches', trend: '+7%' },
            { query: 'blockchain technology', count: '4,900 searches', trend: '+4%' },
            { query: 'sustainable development', count: '4,200 searches', trend: '+9%' },
            { query: 'animal genomics', count: '3,800 searches', trend: '+3%' },
        ],
        mostCitedTheses: [
            {
                title: 'Deep Learning Applications in Medical Imaging',
                authors: 'J. Smith et al.',
                citations: '1,234 citations',
                views: '5,678 views',
                tags: ['AI', 'Medical Imaging', 'Deep Learning'],
            },
            {
                title: 'Climate Change Impact on Southeast Asian Agriculture',
                authors: 'M. Tan et al.',
                citations: '987 citations',
                views: '4,321 views',
                tags: ['Climate Change', 'Agriculture', 'Southeast Asia'],
            },
            {
                title: 'Blockchain Implementation in Supply Chain Management',
                authors: 'R. Garcia et al.',
                citations: '765 citations',
                views: '3,210 views',
                tags: ['Blockchain', 'Supply Chain', 'Management'],
            },
            {
                title: 'AI-Powered Educational Assessment Systems',
                authors: 'L. Chen et al.',
                citations: '642 citations',
                views: '2,987 views',
                tags: ['AI', 'Education', 'Assessment'],
            },
        ],
        overallSummary: {
            totalPublications: 2847,
            avgRating: 4.2,
            usersOnline: 87,
        }
    });

    // Chart.js data structures
    const dailyActivityChartData = {
        labels: dashboardData.dailyActivityTrends.labels,
        datasets: [
            {
                label: 'Daily Activity',
                data: dashboardData.dailyActivityTrends.data,
                fill: true,
                backgroundColor: 'rgba(74, 144, 226, 0.4)',
                borderColor: '#4A90E2',
                tension: 0.3,
            },
        ],
    };

    const dailyActivityChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false, // Hide default title
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(0,0,0,0.05)',
                },
            },
        },
    };

    const thesisCategoriesPieData = {
        labels: dashboardData.thesisCategoriesDistribution.labels,
        datasets: [
            {
                data: dashboardData.thesisCategoriesDistribution.data,
                backgroundColor: dashboardData.thesisCategoriesDistribution.colors,
                hoverOffset: 4,
            },
        ],
    };

    const thesisCategoriesPieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 10,
                    padding: 15,
                    color: '#333',
                    font: {
                        size: 12
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                    }
                }
            }
        },
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-sans">
            {/* Header */}
            <div className="bg-[#1F1F1F] text-white p-4 shadow-md">
                <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <img src={dostLogo} alt="DOST Logo" className="h-12" />
                        <div className="text-xl font-bold">Thesis Analytics Dashboard</div>
                        <div className="text-sm border-l border-white pl-4 ml-4">
                            Manager usage patterns and engagement analytics
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-300">Last 7 days</span>
                        <select className="bg-[#155a8f] text-white p-2 rounded-md text-sm">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>
                        <button className="bg-[#1E74BC] text-white px-4 py-2 rounded-md hover:bg-[#155a8f] transition-colors flex items-center space-x-2">
                            <RefreshCw size={16} />
                            <span>Refresh</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Usage Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Searches</p>
                            <h3 className="text-3xl font-bold text-gray-900">{dashboardData.usageMetrics.totalSearches.toLocaleString()}</h3>
                            <p className="text-sm text-green-500">+11.2%</p>
                        </div>
                        <Award size={36} className="text-[#1E74BC]" />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Total Documents</p>
                            <h3 className="text-3xl font-bold text-gray-900">{dashboardData.usageMetrics.totalDocuments.toLocaleString()}</h3>
                            <p className="text-sm text-green-500">+4.2%</p>
                        </div>
                        <BookOpen size={36} className="text-green-500" />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Reviews</p>
                            <h3 className="text-3xl font-bold text-gray-900">{dashboardData.usageMetrics.totalReviews.toLocaleString()}</h3>
                            <p className="text-sm text-green-500">+6.5%</p>
                        </div>
                        <MessageSquare size={36} className="text-purple-500" />
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Registered Users</p>
                            <h3 className="text-3xl font-bold text-gray-900">{dashboardData.usageMetrics.totalResearchers.toLocaleString()}</h3>
                            <p className="text-sm text-green-500">+2.1%</p>
                        </div>
                        <Users size={36} className="text-orange-500" />
                    </div>
                </div>

                {/* Daily Activity Trends */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily Activity Trends</h3>
                    <div className="h-64"> {/* Fixed height for chart */}
                        <Line data={dailyActivityChartData} options={dailyActivityChartOptions} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Citation Formats */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Citation Formats</h3>
                        <div className="space-y-4">
                            {dashboardData.citationFormats.map((format, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="w-24 text-gray-700">{format.name}</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-2.5 mr-4">
                                        <div
                                            className="bg-blue-500 h-2.5 rounded-full"
                                            style={{ width: format.percentage }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600">{format.count.toLocaleString()} ({format.percentage})</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Thesis Categories Distribution */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Thesis Categories Distribution</h3>
                        <div className="h-64 flex items-center justify-center">
                            <Pie data={thesisCategoriesPieData} options={thesisCategoriesPieOptions} />
                        </div>
                    </div>
                </div>

                {/* Popular Searches */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Searches</h3>
                    <div className="space-y-3">
                        {dashboardData.popularSearches.map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                <span className="text-gray-700 font-medium">{item.query}</span>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">{item.count}</span>
                                    <span className="text-sm text-green-500">{item.trend}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Most Cited Theses */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Cited Theses</h3>
                    <div className="space-y-6">
                        {dashboardData.mostCitedTheses.map((thesis, index) => (
                            <div key={index} className="border border-gray-200 p-4 rounded-lg">
                                <h4 className="font-bold text-md text-blue-700 mb-1">{thesis.title}</h4>
                                <p className="text-sm text-gray-600 mb-2">{thesis.authors}</p>
                                <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2">
                                    <span className="flex items-center mr-4"><Award size={14} className="mr-1 text-yellow-500" /> {thesis.citations}</span>
                                    <span className="flex items-center mr-4"><Clock size={14} className="mr-1 text-gray-400" /> {thesis.views}</span>
                                    {thesis.tags.map((tag, tagIndex) => (
                                        <span key={tagIndex} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full mr-2 mb-1">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overall Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-sm text-gray-500">Total Publications (Since Start)</p>
                        <h3 className="text-3xl font-bold text-gray-900">{dashboardData.overallSummary.totalPublications.toLocaleString()}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-sm text-gray-500">Avg. Dissertation Rating (Stars)</p>
                        <h3 className="text-3xl font-bold text-gray-900">{dashboardData.overallSummary.avgRating}</h3>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-sm text-gray-500">Users Online</p>
                        <h3 className="text-3xl font-bold text-gray-900">{dashboardData.overallSummary.usersOnline}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;