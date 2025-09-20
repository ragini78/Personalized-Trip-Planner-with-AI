import React, { useState, useMemo } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

import { MapPin, Calendar, Users, Plane, Sparkles, Send, Clock, DollarSign, Heart, Star, Globe, Sun, Mountain, Utensils, Building2, Waves, Camera, Moon, Palette } from 'lucide-react';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log('Maps key:', apiKey);

export default function AITripPlanner() {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState({
    destination: null,
    startDate: '',
    endDate: '',
    travelers: 2,
    budget: '',
    tripType: '',
    interests: [],
    accommodation: '',
    transportation: ''
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTrip, setGeneratedTrip] = useState(null);
  const [error, setError] = useState(null);

  const libraries = useMemo(() => ['places'], []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries: libraries,
  });

  const tripTypes = [
    { id: 'adventure', name: 'Adventure', icon: Mountain, color: 'from-orange-400 to-red-500', desc: 'Thrilling outdoor experiences' },
    { id: 'relaxation', name: 'Relaxation', icon: Waves, color: 'from-blue-400 to-cyan-500', desc: 'Peaceful and rejuvenating' },
    { id: 'cultural', name: 'Cultural', icon: Building2, color: 'from-purple-400 to-pink-500', desc: 'Rich history and traditions' },
    { id: 'foodie', name: 'Foodie', icon: Utensils, color: 'from-yellow-400 to-orange-500', desc: 'Culinary delights and local cuisine' }
  ];

  const interests = [
    { id: 'museums', name: 'Museums', icon: '🏛️' },
    { id: 'food', name: 'Local Food', icon: '🍜' },
    { id: 'nature', name: 'Nature', icon: '🌲' },
    { id: 'nightlife', name: 'Nightlife', icon: '🌙' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'beaches', name: 'Beaches', icon: '🏖️' },
    { id: 'hiking', name: 'Hiking', icon: '🥾' },
    { id: 'photography', name: 'Photography', icon: '📸' },
    { id: 'art', name: 'Art & Galleries', icon: '🎨' },
    { id: 'music', name: 'Music & Shows', icon: '🎵' },
    { id: 'wellness', name: 'Wellness & Spa', icon: '🧘' },
    { id: 'architecture', name: 'Architecture', icon: '🏗️' }
  ];

  const getInterestColors = (id) => {
    const colors = {
      'museums': 'from-indigo-100 to-indigo-200 border-indigo-400',
      'food': 'from-yellow-100 to-yellow-200 border-yellow-400',
      'nature': 'from-green-100 to-green-200 border-green-400',
      'nightlife': 'from-gray-100 to-gray-200 border-gray-400',
      'shopping': 'from-pink-100 to-pink-200 border-pink-400',
      'beaches': 'from-blue-100 to-blue-200 border-blue-400',
      'hiking': 'from-orange-100 to-orange-200 border-orange-400',
      'photography': 'from-purple-100 to-purple-200 border-purple-400',
      'art': 'from-red-100 to-red-200 border-red-400',
      'music': 'from-pink-100 to-pink-200 border-pink-400',
      'wellness': 'from-green-100 to-green-200 border-green-400',
      'architecture': 'from-gray-100 to-gray-200 border-gray-400',
    };
    return colors[id] || 'from-indigo-50 to-indigo-100 border-indigo-300';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleInterestChange = (interest) => {
    setTripData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest.name)
        ? prev.interests.filter(i => i !== interest.name)
        : [...prev.interests, interest.name]
    }));
    if (error) setError(null);
  };

  const updateTripData = (field, value) => {
    setTripData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };
  
  const toggleInterest = (interestId) => {
    if (error) setError(null);
    setTripData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setError(null);
      setCurrentStep(currentStep - 1);
    }
  };
  
  const validateAndProceed = () => {
    setError(null);
    let isValid = true;
    let errorMessage = '';

    switch (currentStep) {
      case 1:
        if (!tripData.destination) {
          isValid = false;
          errorMessage = 'Please select a destination.';
        } else if (!tripData.startDate || !tripData.endDate) {
          isValid = false;
          errorMessage = 'Please select both departure and return dates.';
        } else if (new Date(tripData.endDate) <= new Date(tripData.startDate)) {
          isValid = false;
          errorMessage = 'Return date must be after the departure date.';
        }
        break;
      case 2:
        if (!tripData.tripType) {
          isValid = false;
          errorMessage = 'Please select a trip type.';
        } else if (!tripData.budget) {
          isValid = false;
          errorMessage = 'Please select your budget.';
        }
        break;
      case 3:
        if (tripData.interests.length < 3) {
          isValid = false;
          errorMessage = 'Please select at least 3 interests.';
        }
        break;
      default:
        break;
    }

    if (isValid) {
      nextStep();
    } else {
      setError(errorMessage);
    }
  };

  const handleGenerateTrip = () => {
    setError(null);
    let isValid = true;
    let errorMessage = '';

    if (!tripData.accommodation) {
        isValid = false;
        errorMessage = 'Please select an accommodation style.';
    } else if (!tripData.transportation) {
        isValid = false;
        errorMessage = 'Please select a transportation preference.';
    }
    
    if (isValid) {
        generateTrip();
    } else {
        setError(errorMessage);
    }
  };

  const generateTrip = () => {
    setIsGenerating(true);
    setGeneratedTrip(null);

    // Create the payload with proper destination formatting
    const payload = {
      ...tripData,
      // Extract destination name properly from Google Places object
      destination: tripData.destination?.label || tripData.destination?.value?.description || tripData.destination,
      destinationDetails: tripData.destination // Keep full object for backend if needed
    };

    // Debug: Log the payload being sent
    console.log('Sending payload to backend:', JSON.stringify(payload, null, 2));
    console.log('Destination value:', payload.destination);

    const makeApiCall = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/generate-itinerary`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const generatedData = await response.json();
        console.log('Received response from backend:', generatedData);
        setGeneratedTrip(generatedData);
        setCurrentStep(5);
      } catch (error) {
        console.error("API Error:", error);
        if (error.message === 'Failed to fetch') {
          console.error("Failed to generate trip: The backend server is likely not running. Please start your server and try again.", error);
          setGeneratedTrip({
            destination: payload.destination || "Unknown",
            duration: "N/A",
            totalBudget: "N/A",
            highlights: ["Failed to generate itinerary"],
            days: [],
            recommendations: ["The backend server is likely not running. Please start it and try again."]
          });
        } else {
          console.error("Failed to generate trip after multiple retries:", error);
          setGeneratedTrip({
            destination: payload.destination || "Unknown",
            duration: "N/A",
            totalBudget: "N/A",
            highlights: ["Failed to generate itinerary"],
            days: [],
            recommendations: ["An unexpected error occurred. Please ensure your backend server is running and try again."]
          });
        }
        setCurrentStep(5);
      } finally {
        setIsGenerating(false);
      }
    };

    makeApiCall();
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="text-center text-white">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
            <Globe className="w-10 h-10 absolute top-5 left-5 text-white animate-pulse" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Creating Your Dream Trip</h2>
          <div className="space-y-2 text-lg opacity-75">
            <p className="animate-pulse">🔍 Analyzing your preferences...</p>
            <p className="animate-pulse [animation-delay:500ms]">🌍 Finding perfect destinations...</p>
            <p className="animate-pulse [animation-delay:1000ms]">📅 Optimizing your itinerary...</p>
            <p className="animate-pulse [animation-delay:1500ms]">✨ Adding magical experiences...</p>
          </div>

        </div>
      </div>
    );
  }

  if (generatedTrip) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <button
              onClick={() => { setCurrentStep(1); setGeneratedTrip(null); setTripData({
                destination: null, startDate: '', endDate: '', travelers: 2, budget: '',
                tripType: '', interests: [], accommodation: '', transportation: ''
              }); }}
              className="flex items-center text-teal-600 hover:text-teal-800 font-semibold transition-colors"
            >
              ← Plan Another Trip
            </button>
          </div>
         
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-8 text-white text-center">
              <h1 className="text-4xl font-bold mb-2">Your Perfect Trip to {generatedTrip.destination}</h1>
              <div className="flex items-center justify-center space-x-6 text-lg">
                <span className="flex items-center"><Clock className="w-5 h-5 mr-2" />{generatedTrip.duration}</span>
                <span className="flex items-center"><DollarSign className="w-5 h-5 mr-2" />{generatedTrip.totalBudget}</span>
                <span className="flex items-center"><Star className="w-5 h-5 mr-2" />AI Curated</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-4 gap-6 mb-8">
                {generatedTrip.highlights && generatedTrip.highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-teal-50 to-blue-50 p-4 rounded-2xl text-center">
                    <div className="text-2xl mb-2">✨</div>
                    <p className="font-semibold text-gray-800">{highlight}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Daily Itinerary</h2>
                  <div className="space-y-6">
                    {generatedTrip.days && generatedTrip.days.map((day) => (
                      <div key={day.day} className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">
                          Day {day.day}: {day.title}
                        </h3>
                        <div className="space-y-4">
                          {day.morning && (
                            <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-xl">
                              <Sun className="w-6 h-6 text-yellow-500 mt-1" />
                              <div>
                                <div className="font-semibold text-gray-800">{day.morning.activity}</div>
                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                  <Clock className="w-4 h-4 mr-1" />{day.morning.time} •
                                  <MapPin className="w-4 h-4 ml-2 mr-1" />{day.morning.location}
                                </div>
                              </div>
                            </div>
                          )}
                          {day.afternoon && (
                            <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-xl">
                              <Sun className="w-6 h-6 text-orange-500 mt-1" />
                              <div>
                                <div className="font-semibold text-gray-800">{day.afternoon.activity}</div>
                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                  <Clock className="w-4 h-4 mr-1" />{day.afternoon.time} •
                                  <MapPin className="w-4 h-4 ml-2 mr-1" />{day.afternoon.location}
                                </div>
                              </div>
                            </div>
                          )}
                          {day.evening && (
                            <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-xl">
                              <Star className="w-6 h-6 text-purple-500 mt-1" />
                              <div>
                                <div className="font-semibold text-gray-800">{day.evening.activity}</div>
                                <div className="text-sm text-gray-600 flex items-center mt-1">
                                  <Clock className="w-4 h-4 mr-1" />{day.evening.time} •
                                  <MapPin className="w-4 h-4 ml-2 mr-1" />{day.evening.location}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <Heart className="w-5 h-5 text-red-500 mr-2" />
                      Travel Tips
                    </h3>
                    <div className="space-y-3">
                      {generatedTrip.recommendations && generatedTrip.recommendations.map((tip, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                          <p className="text-sm text-gray-700">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-teal-600 hover:to-blue-700 transition-all">
                      Book This Trip
                    </button>
                    <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
                      Save & Share
                    </button>
                    <button className="w-full bg-purple-100 text-purple-700 py-3 rounded-xl font-semibold hover:bg-purple-200 transition-all">
                      Customize Trip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) return <div className="flex items-center justify-center min-h-screen bg-indigo-900 text-white text-xl">Loading Map...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full mr-4">
              <Plane className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white">AI Trip Planner</h1>
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Let artificial intelligence create your perfect travel experience. Answer a few questions and get a personalized itinerary in minutes.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-2 mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= step ? 'bg-white text-indigo-900' : 'bg-white/20 text-white/60'
                  }`}>
                    {step}
                  </div>
                  {step < 4 && (
                    <div className={`flex-1 h-1 mx-4 rounded transition-all duration-300 ${
                      currentStep > step ? 'bg-white' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 min-h-[500px]">

            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Where would you like to go?</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <MapPin className="w-6 h-6 mr-2 text-indigo-600" />
                      Destination
                    </label>
                    <GooglePlacesAutocomplete
                      apiKey={apiKey}
                      selectProps={{
                        placeholder: 'e.g., Haridwar, India',
                        value: tripData.destination,
                        onChange: (value) => {
                          console.log('Destination selected:', value);
                          updateTripData('destination', value);
                        },
                        styles: {
                          control: (provided, state) => ({
                            ...provided,
                            borderRadius: '1.5rem',
                            padding: '0.5rem',
                            borderWidth: '2px',
                            borderColor: state.isFocused ? '#6366f1' : '#e5e7eb',
                            boxShadow: 'none',
                            '&:hover': {
                              borderColor: state.isFocused ? '#6366f1' : '#d1d5db',
                            },
                          }),
                          input: (provided) => ({ ...provided, fontSize: '1.125rem', color: '#1f2937' }),
                          placeholder: (provided) => ({ ...provided, color: '#9ca3af' }),
                        }
                      }}
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <Users className="w-6 h-6 mr-2 text-indigo-600" />
                      Number of Travelers
                    </label>
                    <input
                      type="number"
                      name="travelers"
                      value={tripData.travelers}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none text-lg"
                      min="1"
                      max="10"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
                      Departure Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={tripData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none text-lg"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                      <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
                      Return Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={tripData.endDate}
                      onChange={handleInputChange}
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none text-lg"
                      min={tripData.startDate || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
            <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">What type of trip are you looking for?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {tripTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => updateTripData('tripType', type.id)}
                    className={`p-6 rounded-2xl border-2 text-left transition-all transform hover:scale-105 ${
                      tripData.tripType === type.id
                        ? 'border-indigo-500 bg-indigo-50 shadow-lg ring-2 ring-indigo-200'
                        : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4 ${
                      tripData.tripType === type.id ? 'shadow-lg' : ''
                    }`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${
                      tripData.tripType === type.id ? 'text-indigo-700' : 'text-gray-800'
                    }`}>{type.name}</h3>
                    <p className={`${
                      tripData.tripType === type.id ? 'text-indigo-600' : 'text-gray-600'
                    }`}>{type.desc}</p>
                  </button>
                );
              })}
            </div>
               
                <div className="mt-8">
                  <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                    <DollarSign className="w-6 h-6 mr-2 text-indigo-600" />
                    Budget per person
                  </label>
                  <select
                  name= "budget"
                    value={tripData.budget}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none text-lg"
                  >
                    <option value="">Select your budget</option>
                    <option value="budget">₹20,000 – ₹50,000 (Budget)</option>
                    <option value="mid">₹50,000 – ₹1,00,000 (Mid-range)</option>
                    <option value="luxury">₹1,00,000 – ₹1,50,000 (Luxury)</option>
                    <option value="premium">₹1,50,000+ (Premium)</option>
                  </select>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">What interests you most?</h2>
                <p className="text-center text-gray-600 mb-6">Select all that apply (minimum 3)</p>
                <div className="interests-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {interests.map(interest => (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => handleInterestChange(interest)}
                      className={`interest-button p-4 rounded-2xl border-2 transition-all text-center ${
                        tripData.interests.includes(interest.name)  
                        ? `bg-gradient-to-br ${getInterestColors(interest.id)} border-2 transform scale-105 shadow-md`
                        : 'border border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{interest.icon}</span>
                    {interest.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">Final preferences</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                      <Building2 className="w-6 h-6 mr-2 text-indigo-600" />
                      Accommodation Style
                    </label>
                    <div className="space-y-3">
                      {['hotel', 'boutique', 'resort', 'airbnb'].map((type) => (
                        <button
                          key={type}
                          onClick={() => updateTripData('accommodation', type)}
                          className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                            tripData.accommodation === type
                              ? 'border-indigo-500 bg-indigo-50 shadow-lg ring-2 ring-indigo-200'
                              : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                          }`}
                        >
                          <div className="font-semibold capitalize">{type}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                      <Plane className="w-6 h-6 mr-2 text-indigo-600" />
                      Transportation
                    </label>
                    <div className="space-y-3">
                      {['flight', 'car', 'train', 'mixed'].map((type) => (
                        <button
                          key={type}
                          onClick={() => updateTripData('transportation', type)}
                          className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                            tripData.transportation === type
                              ? 'border-indigo-500 bg-indigo-50 shadow-lg ring-2 ring-indigo-200'
                              : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
                          }`}
                        >
                          <div className="font-semibold capitalize">{type === 'mixed' ? 'Mixed (flights + local transport)' : type}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mt-6 text-center text-red-600 font-semibold bg-red-100 p-3 rounded-2xl">
                <p>{error}</p>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Previous
                </button>
              ) : <div />}

              {currentStep < 4 ? (
                <button
                  onClick={validateAndProceed}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center"
                >
                  Continue
                  <Send className="w-5 h-5 ml-2" />
                </button>
              ) : (
                <button
                  onClick={handleGenerateTrip}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all flex items-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Sparkles className="w-6 h-6 mr-2" />
                  Generate My Trip
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}