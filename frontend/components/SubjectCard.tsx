'use client';

import React from 'react';

interface SubjectCardProps {
    badge?: string;
    badgeColor?: 'pink' | 'blue' | 'yellow' | 'green';
    title: string;
    description: string;
    tasks: number;
    projects?: number;
    additionalTasks?: number;
    progress: number;
    modules?: string;
    startDate?: string;
    avatar: string;
    buttonText: string;
    href?: string;
}

const DEFAULT_BG = "bg-gray-100";


const SubjectCard: React.FC<SubjectCardProps> = ({
    badge,
    badgeColor,
    title,
    description,
    tasks,
    projects,
    additionalTasks,
    progress,
    modules,
    startDate,
    avatar,
    buttonText,
    href,
}) => {
    const colorClasses = {
        pink: {
            bg: 'bg-pink-100',
            badge: 'bg-pink-200/50 text-pink-800',
        },
        blue: {
            bg: 'bg-blue-100',
            badge: 'bg-blue-200/50 text-blue-800',
        },
        yellow: {
            bg: 'bg-yellow-100',
            badge: 'bg-yellow-200/50 text-yellow-800',
        },
        green: {
            bg: 'bg-green-100',
            badge: 'bg-green-200/50 text-green-800',
        },
    };
    const bgClass = badgeColor ? colorClasses[badgeColor].bg : DEFAULT_BG;

    return (
        
        <div className={`${bgClass} rounded-[24px] p-6 relative h-full flex flex-col`}>
            {/* Badge and Avatar */}
            <div className="flex items-start justify-between mb-4">
                {badge && badgeColor && (
                    <span
                        className={`${colorClasses[badgeColor].badge} text-xs font-medium px-3 py-1.5 rounded-lg`}
                    >
                        {badge}
                    </span>
                )}
                <div className="w-16 h-16 flex-shrink-0">
                    <img
                        src={avatar}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Title and Description */}
            <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
            </div>

            {/* Stats Icons */}
            <div className="flex items-center gap-3 mb-5 text-sm text-gray-700">
                <div className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 11h6M9 15h6" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span className="font-medium">{tasks} tasks</span>
                </div>
                {projects && (
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-medium">{projects} projects</span>
                    </div>
                )}
                {additionalTasks && (
                    <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9 11h6M9 15h6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span className="font-medium">{additionalTasks} tasks</span>
                    </div>
                )}
            </div>

            {/* Progress Bar */}
            <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-bold text-gray-900">{progress}%</span>
                </div>
                <div className="w-full bg-white/50 rounded-full h-1.5 overflow-hidden">
                    <div
                        className="bg-gray-900 h-full rounded-full transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Footer with Modules/Date and Button */}
            <div className="flex items-center justify-between mt-auto">
                <div className="text-sm text-gray-700">
                    {modules && (
                        <span>
                            Modules: <span className="font-semibold text-gray-900">{modules}</span>
                        </span>
                    )}
                    {startDate && (
                        <span>
                            Start date: <span className="font-semibold text-gray-900">{startDate}</span>
                        </span>
                    )}
                </div>
                {href ? (
                    <a
                        href={href}
                        className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                        {buttonText}
                    </a>
                ) : (
                    <button className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};




export { SubjectCard };