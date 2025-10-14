import React, { useState } from "react";
import {
  Users,
  Award,
  Shield,
  BookOpen,
  Mail,
  Phone,
  Linkedin,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Crown,
  Scale,
  HeartHandshake,
  Target,
} from "lucide-react";

const LeadershipPage = () => {
  const [activeDepartment, setActiveDepartment] = useState("executive");
  const [expandedProfile, setExpandedProfile] = useState(null);

  const leadershipTeams = {
    executive: [
      {
        name: "Ato Kebede Chala",
        position: "Zone Administrator",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
        bio: "With over 15 years of public service experience, Ato Kebede has been instrumental in driving economic development and infrastructure projects across Nadhii Gibee District.",
        responsibilities: [
          "Strategic Planning",
          "Economic Development",
          "Public Administration",
        ],
        email: "kebede.chala@jimmazone.gov.et",
        phone: "+251 47 111 0001",
        achievements: [
          "Led 20+ infrastructure projects",
          "Increased agricultural output by 35%",
          "Improved healthcare access",
        ],
      },
      {
        name: "Woro Abebe Teshome",
        position: "Deputy Administrator",
        image:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        bio: "Woro Abebe brings extensive experience in community development and has been pivotal in implementing social welfare programs across the zone.",
        responsibilities: [
          "Community Development",
          "Social Services",
          "Education",
        ],
        email: "abebe.teshome@jimmazone.gov.et",
        phone: "+251 47 111 0002",
        achievements: [
          "Expanded educational facilities",
          "Implemented social welfare programs",
          "Enhanced community engagement",
        ],
      },
    ],
    departments: [
      {
        name: "Dr. Selamawit Bekele",
        position: "Head of Health Department",
        image:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
        bio: "Dr. Selamawit has transformed healthcare delivery in Nadhii Gibee District, establishing new clinics and improving medical services across rural areas.",
        responsibilities: [
          "Healthcare Management",
          "Disease Prevention",
          "Medical Services",
        ],
        email: "selamawit.bekele@jimmazone.gov.et",
        phone: "+251 47 111 0101",
        achievements: [
          "Built 15 new clinics",
          "Reduced maternal mortality by 40%",
          "Implemented telemedicine services",
        ],
      },
      {
        name: "Ato Getachew Wolde",
        position: "Head of Education Office",
        image:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
        bio: "Ato Getachew has revolutionized the education system in Nadhii Gibee District, focusing on accessibility and quality of education for all children.",
        responsibilities: [
          "Education Policy",
          "School Management",
          "Curriculum Development",
        ],
        email: "getachew.wolde@jimmazone.gov.et",
        phone: "+251 47 111 0201",
        achievements: [
          "Increased enrollment by 45%",
          "Built 25 new schools",
          "Teacher training programs",
        ],
      },
      {
        name: "Woro Tigist Lemma",
        position: "Head of Agriculture Bureau",
        image:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
        bio: "Woro Tigist has implemented innovative agricultural programs that have significantly increased productivity and sustainability across Nadhii Gibee District.",
        responsibilities: [
          "Agricultural Development",
          "Food Security",
          "Rural Development",
        ],
        email: "tigist.lemma@jimmazone.gov.et",
        phone: "+251 47 111 0301",
        achievements: [
          "Introduced modern farming techniques",
          "Increased crop yield by 60%",
          "Established farmer cooperatives",
        ],
      },
    ],
    advisory: [
      {
        name: "Dr. Mohammed Hassan",
        position: "Senior Economic Advisor",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
        bio: "Dr. Mohammed provides strategic economic guidance, helping shape policies that promote sustainable development and investment in Nadhii Gibee District.",
        responsibilities: [
          "Economic Policy",
          "Investment Strategies",
          "Development Planning",
        ],
        email: "mohammed.hassan@jimmazone.gov.et",
        phone: "+251 47 111 0401",
        achievements: [
          "Attracted $50M in investments",
          "Developed economic growth plan",
          "Established trade partnerships",
        ],
      },
      {
        name: "Woro Aster Demissie",
        position: "Cultural Heritage Advisor",
        image:
          "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
        bio: "Woro Aster works to preserve and promote the rich cultural heritage of Nadhii Gibee District, ensuring traditional practices are maintained alongside modern development.",
        responsibilities: [
          "Cultural Preservation",
          "Heritage Management",
          "Community Traditions",
        ],
        email: "aster.demissie@jimmazone.gov.et",
        phone: "+251 47 111 0402",
        achievements: [
          "Documented cultural traditions",
          "Established cultural centers",
          "Promoted cultural tourism",
        ],
      },
    ],
  };

  const departments = [
    { id: "executive", label: "Executive Leadership", icon: Crown },
    { id: "departments", label: "Department Heads", icon: Users },
    { id: "advisory", label: "Advisory Council", icon: Scale },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We uphold the highest ethical standards in all our actions and decisions.",
    },
    {
      icon: HeartHandshake,
      title: "Service",
      description:
        "We are committed to serving the people of Jimma with dedication and compassion.",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in all our programs and initiatives.",
    },
    {
      icon: Scale,
      title: "Accountability",
      description:
        "We take responsibility for our actions and are transparent in our governance.",
    },
  ];

  const toggleProfile = (index) => {
    if (expandedProfile === index) {
      setExpandedProfile(null);
    } else {
      setExpandedProfile(index);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F4FF] to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80)",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Leadership & Governance
            </h1>
            <p className="text-xl text-[#21203C]/80 mb-8">
              Meet the dedicated team guiding Nadhii Gibee District towards
              prosperity and sustainable development
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-[#21203C]/80 rounded-full">
              <Shield size={20} className="mr-2" />
              Committed to Transparent Governance
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-[#21203C]">Guiding Principles</span>
            </h2>
            <p className="text-lg text-gray-600">
              The leadership of Nadhii Gibee District Administration is
              committed to these core values in serving our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-[#21203C]/5 rounded-2xl p-6 text-center group hover:bg-[#21203C]/10 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-[#21203C] rounded-full text-white mb-4 group-hover:bg-[#2D2B4A]">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-[#21203C] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-[#21203C]/80">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Department Navigation */}
      <section className="py-12 bg-[#21203C]/10 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center gap-4">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveDepartment(dept.id)}
                  className={`flex items-center px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeDepartment === dept.id
                      ? "bg-[#21203C] text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-[#21203C]/5"
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-medium">{dept.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadershipTeams[activeDepartment].map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                    <h3 className="text-xl font-bold">{leader.name}</h3>
                    <p className="text-[#21203C]/80">{leader.position}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {leader.responsibilities.map((resp, i) => (
                      <span
                        key={i}
                        className="bg-[#21203C]/10 text-[#21203C] text-xs px-2 py-1 rounded-full"
                      >
                        {resp}
                      </span>
                    ))}
                  </div>

                  <p className="text-[#21203C]/80 mb-6 line-clamp-3">
                    {leader.bio}
                  </p>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleProfile(index)}
                      className="text-[#21203C] font-medium flex items-center hover:text-[#21203C]/80"
                    >
                      {expandedProfile === index ? (
                        <>
                          <ChevronUp size={16} className="mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDown size={16} className="mr-1" />
                          Learn More
                        </>
                      )}
                    </button>

                    <div className="flex space-x-2">
                      <a
                        href={`mailto:${leader.email}`}
                        className="text-gray-500 hover:text-[#21203C]"
                      >
                        <Mail size={18} />
                      </a>
                      <a
                        href={`tel:${leader.phone}`}
                        className="text-gray-500 hover:text-[#21203C]"
                      >
                        <Phone size={18} />
                      </a>
                    </div>
                  </div>

                  {expandedProfile === index && (
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <h4 className="font-bold text-[#21203C] mb-3">
                        Key Achievements
                      </h4>
                      <ul className="list-disc list-inside text-[#21203C]/80 space-y-2 mb-6">
                        {leader.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>

                      <div className="flex space-x-4">
                        <a
                          href={`mailto:${leader.email}`}
                          className="flex-1 bg-[#21203C] hover:bg-[#2D2B4A] text-white text-center py-2 px-4 rounded-lg transition-colors duration-300"
                        >
                          Send Message
                        </a>
                        <button className="bg-[#21203C]/10 hover:bg-[#21203C]/20 text-[#21203C] p-2 rounded-lg transition-colors duration-300">
                          <MessageCircle size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Organizational Structure */}
      <section className="py-16 bg-[#F5F4FF]">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Organizational <span className="text-[#21203C]">Structure</span>
            </h2>
            <p className="text-lg text-[#21203C]/80">
              Understanding how Nadhii Gibee District Administration is
              organized to serve you better
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md">
            <div className="relative h-96 bg-gradient-to-r from-[#21203C]/10 to-[#2D2B4A]/10 rounded-xl overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Users size={48} className="text-[#21203C] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Organizational Chart
                  </h3>
                  <p className="text-[#21203C]/80">
                    Interactive organizational structure of Nadhii Gibee
                    District Administration
                  </p>
                  <button className="mt-4 bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300">
                    View Full Chart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message from Leadership */}
      <section className="py-16 bg-gradient-to-r from-[#21203C] to-[#2D2B4A] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
                  alt="Zone Administrator"
                  className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Message from the Administrator
                </h2>
                <blockquote className="text-lg italic mb-6">
                  "It is my honor to serve the people of Nadhii Gibee District.
                  Our administration is committed to transparency, development,
                  and improving the quality of life for all our residents.
                  Together, we are building a brighter future for Jimma."
                </blockquote>
                <div>
                  <p className="font-bold">Ato Kebede Chala</p>
                  <p className="text-[#21203C]/80">
                    Nadhii Gibee Administrator, Nadhii Gibee District
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Leadership */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Connect with <span className="text-[#21203C]">Leadership</span>
            </h2>
            <p className="text-lg text-[#21203C]/80 mb-8">
              We value your input and are here to serve you. Reach out to our
              leadership team with your questions and suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#21203C] hover:bg-[#2D2B4A] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contact Administration
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#21203C] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LeadershipPage;
