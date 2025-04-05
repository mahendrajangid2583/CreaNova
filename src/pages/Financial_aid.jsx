import React, { useState } from 'react';
import { Search, Filter, Award } from 'lucide-react';

// Mock scholarship data
const scholarshipData = [
  {
    id: 1,
    title: 'Academic Excellence Scholarship',
    description: 'For students with outstanding academic performance',
    amount: '$5,000',
    eligibility: 'GPA 3.5+, Full-time student',
    deadline: 'June 30, 2024'
  },
  {
    id: 2,
    title: 'Community Service Scholarship',
    description: 'Rewarding students with significant community involvement',
    amount: '$3,500',
    eligibility: '100+ community service hours',
    deadline: 'July 15, 2024'
  },
  {
    id: 3,
    title: 'STEM Innovation Scholarship',
    description: 'For students pursuing science, technology, engineering, or mathematics',
    amount: '$7,500',
    eligibility: 'STEM major, Research experience',
    deadline: 'August 1, 2024'
  },
  {
    id: 1,
    title: 'center Gov Scholarship',
    description: 'For students with outstanding academic performance',
    amount: '$5,000',
    eligibility: 'GPA 3.5+, Full-time student',
    deadline: 'June 30, 2024'
  },
  {
    id: 1,
    title: 'Academic Excellence Scholarship',
    description: 'For students with outstanding academic performance',
    amount: '$5,000',
    eligibility: 'GPA 3.5+, Full-time student',
    deadline: 'June 30, 2024'
  },
];

const FinancialAidPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredScholarships, setFilteredScholarships] = useState(scholarshipData);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = scholarshipData.filter(scholarship => 
      scholarship.title.toLowerCase().includes(term) ||
      scholarship.description.toLowerCase().includes(term)
    );
    
    setFilteredScholarships(filtered);
  };

  return (
    <div className="min-h-screen bg-richblack-800 text-white p-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Financial Aid Scholarships</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-6 flex space-x-4">
          <div className="flex-grow relative">
          <input 
              type="text" 
              placeholder="Search scholarships..." 
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-10 py-2 bg-richblack-700 text-white border border-richblack-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-richblack-500"
            />
            <Search color='#808080' className="absolute left-3 top-3 text-richblack-500" />
          </div>
          <button 
            className="px-4 py-2 bg-richblack-800 text-white border border-richblack-600 rounded-md hover:bg-richblack-600 flex items-center"
          >
            <Filter className="mr-2" /> Filters
          </button>
        </div>

        {/* Scholarships Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredScholarships.map((scholarship) => (
            <div 
              key={scholarship.id} 
              className="bg-richblack-800 border border-richblack-600 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="mr-2 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">{scholarship.title}</h2>
                </div>
                <p className="text-richblack-400 mb-4">{scholarship.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-richblack-300">Amount:</span>
                    <span className=" text-caribbeangreen-400">{scholarship.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-richblack-300">Eligibility:</span>
                    <span className="text-white">{scholarship.eligibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-richblack-300">Deadline:</span>
                    <span className=" text-[#EF5350]">{scholarship.deadline}</span>
                  </div>
                </div>
                <button 
                  className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                  onClick={() => alert(`Applying for ${scholarship.title}`)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredScholarships.length === 0 && (
          <div className="text-center text-richblack-500 mt-10">
            No scholarships found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialAidPage;