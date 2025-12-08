import {
  ArrowLeft,
  Star,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  Award,
  AlertTriangle,
  User,
  MoreVertical,
  Edit,
  Eye,
  CheckCircle,
  LucideIcon,
  Search,
} from "lucide-react";
import React from "react";
import type { JSX, SVGProps } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "../ui";
import Link from "next/link";

type SummaryData = {
  averageRating: number;
  totalReviews: number;
  recommendationRate: string;
  topRated: number;
  totalReviewsCount: number;
};

type DistributionItem = {
  level: number;
  percent: number;
  count: number;
};

type CategoryScore = {
  name: string;
  score: number;
  color: string;
};

type ReviewScores = Record<string, number>;

type Review = {
  name: string;
  location: string;
  overallRating: number;
  date: string;
  status: string;
  alerts: number;
  scores: ReviewScores;
  comment: string;
  positives: string[];
  areasForImprovement: string[];
  tenancy: string;
  isActive: boolean;
};

type PerformanceCardType = {
  name: string;
  overall: number;
  recommendationRate: string;
  scores: ReviewScores;
  trend: "up" | "down";
};

type RatingTrend = {
  label: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

const summaryData: SummaryData = {
  averageRating: 3.8,
  totalReviews: 4,
  recommendationRate: "50%",
  topRated: 2,
  totalReviewsCount: 500,
};

const distributionData: DistributionItem[] = [
  { level: 1, percent: 25, count: 125 },
  { level: 2, percent: 15, count: 75 },
  { level: 3, percent: 10, count: 50 },
  { level: 4, percent: 35, count: 175 },
  { level: 5, percent: 15, count: 75 },
];

const categoryScores: CategoryScore[] = [
  { name: "Payment", score: 4.0, color: "bg-orange-500" },
  { name: "Communication", score: 4.0, color: "bg-orange-500" },
  { name: "Property Care", score: 4.0, color: "bg-orange-500" },
  { name: "Compliance", score: 4.0, color: "bg-orange-500" },
  { name: "Maintenance", score: 4.0, color: "bg-orange-500" },
];

const reviewDetails: Review[] = [
  {
    name: "Sophie Headrick",
    location: "Skyline Towers, Penthouse A",
    overallRating: 3.0,
    date: "2025-01-05",
    status: "Overstayed",
    alerts: 3,
    scores: {
      Payment: 3.0,
      Maintenance: 3.0,
      Communication: 3.0,
      PropertyCare: 3.0,
      Compliance: 3.0,
    },
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    positives: ["Professional background"],
    areasForImprovement: [
      "Payment reliability",
      "Property care",
      "Neighbor relations",
      "Compliance with rules",
    ],
    tenancy: "16 months",
    isActive: true,
  },
  {
    name: "Sophie Headrick",
    location: "Skyline Towers, Penthouse A",
    overallRating: 3.0,
    date: "2025-01-05",
    status: "Overstayed",
    alerts: 3,
    scores: {
      Payment: 3.0,
      Maintenance: 3.0,
      Communication: 3.0,
      PropertyCare: 3.0,
      Compliance: 3.0,
    },
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    positives: ["Professional background"],
    areasForImprovement: [
      "Payment reliability",
      "Property care",
      "Neighbor relations",
      "Compliance with rules",
    ],
    tenancy: "16 months",
    isActive: true,
  },
  {
    name: "Sophie Headrick",
    location: "Skyline Towers, Penthouse A",
    overallRating: 3.0,
    date: "2025-01-05",
    status: "Overstayed",
    alerts: 3,
    scores: {
      Payment: 3.0,
      Maintenance: 3.0,
      Communication: 3.0,
      PropertyCare: 3.0,
      Compliance: 3.0,
    },
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco",
    positives: ["Professional background"],
    areasForImprovement: [
      "Payment reliability",
      "Property care",
      "Neighbor relations",
      "Compliance with rules",
    ],
    tenancy: "16 months",
    isActive: true,
  },
];

const performanceCards: PerformanceCardType[] = [
  {
    name: "Michael Chen",
    overall: 4.0,
    recommendationRate: "100%",
    scores: {
      Payment: 4.0,
      Maintenance: 4.0,
      Communication: 4.0,
      PropertyCare: 4.0,
      Compliance: 4.0,
    },
    trend: "up",
  },
  {
    name: "Sophie Headrick",
    overall: 3.0,
    recommendationRate: "0%",
    scores: {
      Payment: 2.5,
      Maintenance: 3.0,
      Communication: 4.0,
      PropertyCare: 3.0,
      Compliance: 3.0,
    },
    trend: "down",
  },
  {
    name: "Doris Crowley",
    overall: 5.0,
    recommendationRate: "100%",
    scores: {
      Payment: 5.0,
      Maintenance: 5.0,
      Communication: 5.0,
      PropertyCare: 5.0,
      Compliance: 5.0,
    },
    trend: "up",
  },
];

const ratingTrends: RatingTrend[] = [
  {
    label: "Improving Tenants",
    description: "1 tenant showing improvement",
    icon: ArrowUpRight,
    color: "text-green-600",
  },
  {
    label: "Declining Performance",
    description: "1 tenant needs attention",
    icon: ArrowDownRight,
    color: "text-red-600",
  },
  {
    label: "Stable Performance",
    description: "1 tenant maintaining standards",
    icon: ArrowRight,
    color: "text-gray-500",
  },
];

type StarRatingProps = {
  rating: number;
  totalStars?: number;
  starSize?: string;
};

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  starSize = "w-4 h-4",
}) => {
  const filledStars = Math.round(rating * 2) / 2;
  const stars: JSX.Element[] = [];

  for (let i = 1; i <= totalStars; i++) {
    let color = "text-yellow-400";

    if (i <= filledStars) {
      // fully filled
    } else if (i - 0.5 === filledStars) {
      // visually treat as filled for simplicity
    } else {
      color = "text-gray-300";
    }

    stars.push(
      <Star
        key={i}
        className={`${starSize} ${color}`}
        fill={i <= filledStars ? "currentColor" : "none"}
        strokeWidth={i <= filledStars ? 0 : 2}
      />
    );
  }

  return <div className="flex items-center space-x-0.5">{stars}</div>;
};

type SummaryCardBaseProps = {
  icon: LucideIcon;
  value: string | number;
  label: string;
  unit?: string;
  iconColor: string;
  borderColor: string;
};

const SummaryCardBase: React.FC<SummaryCardBaseProps> = ({
  icon: Icon,
  value,
  label,
  unit = "",
  iconColor,
  borderColor,
}) => (
  <div
    className={`flex py-8 items-center p-4 rounded-xl shadow-md bg-white border border-gray-200`}>
    <div
      className={`p-2 rounded-full bg-opacity-10 flex items-center justify-center mb-1`}>
      <Icon className={`w-7 h-7 ${iconColor}`} />
    </div>
    <div className="text-2xl font-bold text-gray-800">
      <p className="text-sm text-gray-500">{label}</p>
      {value}
    </div>
  </div>
);

const SummaryCards: React.FC = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
    <SummaryCardBase
      icon={Star}
      value={summaryData.averageRating}
      label="Average Rating"
      unit=""
      iconColor="text-orange-500"
      borderColor="border-orange-500"
    />
    <SummaryCardBase
      icon={MessageSquare}
      value={summaryData.totalReviews}
      label="Total Reviews"
      unit=""
      iconColor="text-blue-500"
      borderColor="border-blue-500"
    />
    <SummaryCardBase
      icon={ThumbsUp}
      value={summaryData.recommendationRate}
      label="Recommendation Rate"
      iconColor="text-green-500"
      borderColor="border-green-500"
    />
    <SummaryCardBase
      icon={Award}
      value={summaryData.topRated}
      label="Top Rated"
      unit="tenants"
      iconColor="text-purple-500"
      borderColor="border-purple-500"
    />
  </div>
);

const RatingDistribution: React.FC = () => (
  <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      Rating Distribution
    </h2>
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="flex-1 w-full space-y-3">
        {distributionData.map((item) => (
          <div key={item.level} className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600 w-4 text-right">
              {item.level}
            </span>
            <div className="flex-1 h-2.5 bg-gray-200 rounded-full">
              <div
                className="h-2.5 rounded-full bg-yellow-400 transition-all duration-500"
                style={{ width: `${item.percent}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600 w-8 text-left hidden sm:inline">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>

      <div className="md:w-1/4 flex flex-col items-center justify-center text-center">
        <div className="text-6xl font-extrabold text-gray-800">
          {summaryData.averageRating.toFixed(1)}
        </div>
        <StarRating rating={summaryData.averageRating} starSize="w-6 h-6" />
        <p className="text-sm text-gray-500 mt-1">
          {summaryData.totalReviewsCount} reviews
        </p>
      </div>
    </div>
  </div>
);

const RatingsReviewsTab: React.FC = () => {
  const review = reviewDetails[0];

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex w-full justify-between space-x-2">
          <div className="flex border w-full items-center border-gray-200 rounded-sm p-1 px-2">
            <Search className="w-5 h-5" />
            <Input
              type="text"
              placeholder="Search..."
              className="px-3  py-2 bg-white! border shadow-none border-none focus-visible:ring-0 rounded-lg focus:ring-orange-500 focus:border-orange-500 text-sm"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Ratings</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Properties</option>
            </select>
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>Most Recent</option>
            </select>
          </div>
        </div>
      </div>

      {reviewDetails.map((review) => (
        <div
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mt-2"
          key={review.name}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">{review.name}</p>
                <p className="text-xs text-gray-500">{review.location}</p>
              </div>
            </div>
            <div className="flex space-x-2 text-xs font-medium">
              <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full">
                {review.status}
              </span>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-600 rounded-full flex items-center">
                <AlertTriangle className="w-3 h-3 mr-1" /> {review.alerts}{" "}
                Alert(s)
              </span>
              <MoreVertical className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-4 mb-4 border-b pb-4">
            <div className="flex flex-col space-y-1">
              <div className="flex items-center">
                <StarRating
                  rating={review.overallRating}
                  starSize="w-3.5 h-3.5"
                />
                <span className="ml-2 text-sm font-medium text-gray-800">
                  {review.overallRating.toFixed(1)}
                </span>
              </div>
              <p className="text-xs text-gray-500">{review.date}</p>
            </div>
            {Object.entries(review.scores).map(([category, score]) => (
              <div key={category} className="flex flex-col space-y-1">
                <p className="text-xs font-medium text-gray-800">{category}</p>
                <div className="flex items-center text-sm">
                  <StarRating rating={score} starSize="w-3.5 h-3.5" />
                  <span className="ml-2 font-medium text-gray-600">
                    {score.toFixed(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-700 mb-4">{review.comment}</p>

          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-600 mb-2">
              Positives:
            </h4>
            <div className="flex flex-wrap gap-2">
              {review.positives.map((p) => (
                <span
                  key={p}
                  className="px-3 py-1 text-xs font-medium bg-green-100 text-green-700 rounded-full flex items-center">
                  <CheckCircle className="w-3 h-3 mr-1" /> {p}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-600 mb-2">
              Areas for Improvement:
            </h4>
            <div className="flex flex-wrap gap-2">
              {review.areasForImprovement.map((a) => (
                <span
                  key={a}
                  className="px-3 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full flex items-center">
                  <AlertTriangle className="w-3 h-3 mr-1" /> {a}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 pt-4 border-t">
            <p>
              Tenancy: {review.tenancy} | Status:{" "}
              {review.isActive ? "active" : "inactive"}
            </p>
            <div className="flex space-x-3">
              <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
                <Edit className="w-4 h-4 mr-1" /> Edit
              </button>
              <button className="flex items-center text-gray-600 hover:text-gray-800 font-medium">
                <Eye className="w-4 h-4 mr-1" /> View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const PerformanceAnalysisTab: React.FC = () => {
  const categories = Object.keys(performanceCards[0].scores);

  const PerformanceCard: React.FC<{ tenant: PerformanceCardType }> = ({
    tenant,
  }) => {
    const TrendIcon = tenant.trend === "up" ? ArrowUpRight : ArrowDownRight;
    const trendColor =
      tenant.trend === "up" ? "text-green-600" : "text-red-600";

    return (
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg flex flex-col justify-between">
        <div className="flex justify-between items-start mb-3">
          <p className="font-semibold text-gray-800">{tenant.name}</p>
          <TrendIcon className={`w-5 h-5 ${trendColor}`} />
        </div>
        <div className="flex items-center mb-4">
          <StarRating rating={tenant.overall} starSize="w-4 h-4" />
          <span className="ml-2 text-xl font-bold text-gray-800">
            {tenant.overall.toFixed(1)}
          </span>
        </div>

        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat}
              className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">{cat}</span>
              <span className="font-semibold text-gray-800">
                {tenant.scores[cat].toFixed(1)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t text-sm flex justify-between">
          <span className="text-gray-500">Recommendation Rate</span>
          <span className="font-semibold text-orange-500">
            {tenant.recommendationRate}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Tenant Comparison
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {performanceCards.map((tenant) => (
          <PerformanceCard key={tenant.name} tenant={tenant} />
        ))}
      </div>
    </div>
  );
};

const AnalyticsTab: React.FC = () => (
  <div className="mt-8 space-y-8">
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Average Category Scores
      </h2>
      <div className="space-y-4">
        {categoryScores.map((item) => (
          <div key={item.name} className="flex items-center">
            <p className="w-40 font-medium text-gray-700">{item.name}</p>
            <div className="flex-1 mx-4 h-2.5 bg-gray-200 rounded-full">
              <div
                className={`h-2.5 rounded-full ${item.color} transition-all duration-500`}
                style={{ width: `${(item.score / 5) * 100}%` }}
              />
            </div>
            <span className="text-lg font-bold text-gray-800 w-8 text-right">
              {item.score.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Rating Trends
      </h2>
      <div className="space-y-5">
        {ratingTrends.map((trend) => {
          const TrendIcon = trend.icon;
          return (
            <div
              key={trend.label}
              className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-b-0 last:pb-0">
              <div>
                <p className="font-semibold text-gray-700">{trend.label}</p>
                <p className="text-sm text-gray-500">{trend.description}</p>
              </div>
              <TrendIcon className={`w-6 h-6 ${trend.color} stroke-2`} />
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const TenantRatingReviews: React.FC = () => {
  return (
    <div className="min-h-screen pl-0 sm:pl-0 p-4 sm:p-8 font-sans">
      <div className="mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Link href="/tenant/directory">
                <ArrowLeft className="w-5 h-5 text-gray-600 mr-3 cursor-pointer" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">
                Tenant Ratings & Reviews
              </h1>
            </div>
            <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-orange-600 transition duration-150">
              <Plus className="w-4 h-4 mr-2" /> Add Rating
            </button>
          </div>
          <p className="text-sm text-gray-500 ml-8">
            Manage tenant performance ratings and feedback
          </p>
        </header>

        <SummaryCards />
        <RatingDistribution />

        <Tabs defaultValue="ratings" className="mt-8">
          <TabsList className="bg-white w-full">
            <TabsTrigger
              value="ratings"
              className="pb-3 px-6 text-lg border-b-2 rounded-none shadow-none! data-[state=active]:border-b-orange-500 font-medium">
              Ratings & Reviews
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="pb-3 px-6 text-lg border-b-2 rounded-none shadow-none! data-[state=active]:border-b-orange-500 font-medium">
              Performance Analysis
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="pb-3 px-6 text-lg border-b-2 rounded-none shadow-none! data-[state=active]:border-b-orange-500 font-medium">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ratings">
            <RatingsReviewsTab />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceAnalysisTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
        </Tabs>

        <div className="pb-16" />
      </div>
    </div>
  );
};

export default TenantRatingReviews;
