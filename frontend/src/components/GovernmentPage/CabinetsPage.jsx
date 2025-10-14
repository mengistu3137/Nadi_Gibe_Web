import React, { useState } from "react";
import {
  Users,
  Building2,
  Award,
  Mail,
  Phone,
  MapPin,
  Filter,
  Search,
  BarChart3,
  HeartPulse,
  GraduationCap,
  Sprout,
  Landmark,
  Banknote,
  Shield,
  ArrowRight,
  Download,
  Calendar,
  MessageCircle,
} from "lucide-react";

const CabinetsPage = () => {
  const [activeCabinet, setActiveCabinet] = useState("executive");
  const [searchTerm, setSearchTerm] = useState("");

  const cabinets = [
    {
      name: "executive",
      title: "Executive Cabine",
      description:
        "The primary decision-making body of Nadhii Gibee District Administration",
      color: "from-[#1a1a2e] to-[#1a1a2e]",
      icon: Shield,
      members: [
        {
          name: "Ato Kebede Chala",
          position: "Chief Administrator",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
          department: "Executive Office",
          email: "kebede.chala@jimmazone.gov.et",
          phone: "+251 47 111 0001",
        },
        {
          name: "Woro Abebe Teshome",
          position: "Deputy Administrator",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
          department: "Executive Office",
          email: "abebe.teshome@jimmazone.gov.et",
          phone: "+251 47 111 0002",
        },
        {
          name: "Ato Getachew Wolde",
          position: "Chief of Staff",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80",
          department: "Executive Office",
          email: "getachew.wolde@jimmazone.gov.et",
          phone: "+251 47 111 0003",
        },
      ],
    },
    {
      name: "health",
      title: "Health Cabine",
      description:
        "Overseeing healthcare services and public health initiatives",
      color: "from-[#1a1a2e] to-[#1a1a2e]",
      icon: HeartPulse,
      members: [
        {
          name: "Dr. Selamawit Bekele",
          position: "Head of Health Department",
          image:
            "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80",
          department: "Health Services",
          email: "selamawit.bekele@jimmazone.gov.et",
          phone: "+251 47 111 0101",
        },
        {
          name: "Dr. Mohammed Ahmed",
          position: "Public Health Director",
          image:
            "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80",
          department: "Public Health",
          email: "mohammed.ahmed@jimmazone.gov.et",
          phone: "+251 47 111 0102",
        },
      ],
    },
    {
      name: "education",
      title: "Education Cabine",
      description: "Managing educational institutions and programs",
      color: "from-[#1a1a2e] to-[#1a1a2e]",
      icon: GraduationCap,
      members: [
        {
          name: "Woro Tigist Lemma",
          position: "Head of Education Office",
          image:
            "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
          department: "Education",
          email: "tigist.lemma@jimmazone.gov.et",
          phone: "+251 47 111 0201",
        },
        {
          name: "Ato Solomon Bekele",
          position: "Curriculum Director",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
          department: "Education",
          email: "solomon.bekele@jimmazone.gov.et",
          phone: "+251 47 111 0202",
        },
      ],
    },
    {
      name: "agriculture",
      title: "Agriculture Cabine",
      description: "Supporting agricultural development and food security",
      color: "from-[#1a1a2e] to-[#1a1a2e]",
      icon: Sprout,
      members: [
        {
          name: "Ato Jemal Hussein",
          position: "Head of Agriculture Bureau",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
          department: "Agriculture",
          email: "jemal.hussein@jimmazone.gov.et",
          phone: "+251 47 111 0301",
        },
        {
          name: "Woro Aster Demissie",
          position: "Rural Development Director",
          image:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80",
          department: "Agriculture",
          email: "aster.demissie@jimmazone.gov.et",
          phone: "+251 47 111 0302",
        },
      ],
    },
    {
      name: "finance",
      title: "Finance & Economy Cabine",
      description: "Managing budget and economic development programs",
      color: "from-[#1a1a2e] to-[#1a1a2e]",
      icon: Banknote,
      members: [
        {
          name: "Ato Samuel Tadesse",
          position: "Head of Finance Department",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
          department: "Finance",
          email: "samuel.tadesse@jimmazone.gov.et",
          phone: "+251 47 111 0401",
        },
        {
          name: "Woro Hanna Girma",
          position: "Economic Development Director",
          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
          department: "Finance",
          email: "hanna.girma@jimmazone.gov.et",
          phone: "+251 47 111 0402",
        },
      ],
    },
    {
      name: "infrastructure",
      title: "Infrastructure Cabine",
      description: "Overseeing development projects and public works",
      color: "from-[#1a1a2e] to-[#1a1a2e]",
      icon: Building2,
      members: [
        {
          name: "Ato Daniel Mekonnen",
          position: "Head of Infrastructure Development",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
          department: "Infrastructure",
          email: "daniel.mekonnen@jimmazone.gov.et",
          phone: "+251 47 111 0501",
        },
        {
          name: "Ato Teshome Abebe",
          position: "Urban Planning Director",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
          department: "Infrastructure",
          email: "teshome.abebe@jimmazone.gov.et",
          phone: "+251 47 111 0502",
        },
      ],
    },
  ];

  const filteredMembers =
    cabinets
      .find((cabinet) => cabinet.name === activeCabinet)
      ?.members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.department.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  const currentCabinet = cabinets.find(
    (cabinet) => cabinet.name === activeCabinet
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#1a1a2e] to-[#1a1a2e]/90 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80)",
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Government Cabines
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Meet the dedicated teams leading various sectors of Nadhii Gibee
              District Administration
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-[#1a1a2e]/80 rounded-full">
              <Users size={20} className="mr-2" />
              Collaborative Leadership for Development
            </div>
          </div>
        </div>
      </section>

      {/* Cabinet Navigation */}
      <section className="py-8 bg-yellow-50 sticky top-0 z-20 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {cabinets.map((cabinet) => {
                const Icon = cabinet.icon;
                return (
                  <button
                    key={cabinet.name}
                    onClick={() => setActiveCabinet(cabinet.name)}
                    className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      activeCabinet === cabinet.name
                        ? `bg-gradient-to-r ${cabinet.color} text-white shadow-lg`
                        : "bg-white text-gray-700 hover:bg-yellow-50"
                    }`}
                  >
                    <Icon size={18} className="mr-2" />
                    {cabinet.title}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search cabine members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
                />
              </div>
              <button className="bg-white p-2 rounded-lg border border-gray-200 hover:bg-gray-50 flex items-center">
                <Filter size={18} className="mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Cabinet Header */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {currentCabinet && (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100 mb-8">
              <div className="flex items-start">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${currentCabinet.color} text-white mr-6`}
                >
                  <currentCabinet.icon size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentCabinet.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-4">
                    {currentCabinet.description}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users size={16} className="mr-1" />
                    {filteredMembers.length} members
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cabinet Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-yellow-200">{member.position}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Building2 size={14} className="mr-1" />
                    {member.department}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">{member.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">{member.phone}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                      Contact
                    </button>
                    <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-2 rounded-lg transition-colors duration-300">
                      <MessageCircle size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <Users size={48} className="text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No members found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Cabinet Statistics */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cabine <span className="text-[#1a1a2e]">Statistics</span>
            </h2>
            <p className="text-lg text-gray-600">
              Overview of the governmental structure and composition
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-yellow-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full text-yellow-700 mb-4 mx-auto">
                <Users size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">6</div>
              <div className="text-gray-600">Cabines</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-yellow-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full text-yellow-700 mb-4 mx-auto">
                <Award size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">14</div>
              <div className="text-gray-600">Cabine Members</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-yellow-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full text-yellow-700 mb-4 mx-auto">
                <BarChart3 size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">32%</div>
              <div className="text-gray-600">Female Representation</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-md border border-yellow-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full text-yellow-700 mb-4 mx-auto">
                <Calendar size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">2023</div>
              <div className="text-gray-600">Current Term</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cabinet Functions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cabine <span className="text-[#1a1a2e]">Functions</span>
            </h2>
            <p className="text-lg text-gray-600">
              The roles and responsibilities of Nadhii Gibee District
              governmental cabines
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Policy Development",
                description:
                  "Formulating and implementing policies for sectoral development",
                icon: Shield,
                color: "bg-yellow-100 text-yellow-700",
              },
              {
                title: "Strategic Planning",
                description:
                  "Creating long-term development strategies for the zone",
                icon: BarChart3,
                color: "bg-yellow-100 text-yellow-700",
              },
              {
                title: "Resource Allocation",
                description:
                  "Managing budget and resources for effective service delivery",
                icon: Banknote,
                color: "bg-yellow-100 text-yellow-700",
              },
              {
                title: "Program Implementation",
                description: "Executing development programs and projects",
                icon: Award,
                color: "bg-yellow-100 text-yellow-700",
              },
              {
                title: "Stakeholder Engagement",
                description: "Collaborating with communities and partners",
                icon: Users,
                color: "bg-yellow-100 text-yellow-700",
              },
              {
                title: "Performance Monitoring",
                description: "Tracking progress and evaluating outcomes",
                icon: BarChart3,
                color: "bg-yellow-100 text-yellow-700",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item.color} mb-4`}
                  >
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-[#1a1a2e] to-[#1a1a2e]/90 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need to Contact a Cabine Member?
            </h2>
            <p className="text-xl mb-8">
              Reach out to our cabine members for inquiries, suggestions, or
              collaboration opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white hover:bg-gray-100 text-[#1a1a2e] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Contact Directory
              </button>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-[#1a1a2e] font-bold py-3 px-6 rounded-lg transition-colors duration-300">
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Download Resources */}
      <section className="py-16 bg-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cabine <span className="text-[#1a1a2e]">Resources</span>
            </h2>
            <p className="text-lg text-gray-600">
              Download organizational charts, reports, and other cabine-related
              documents
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Organizational Chart", type: "PDF", size: "2.1 MB" },
              { title: "Cabine Portfolio", type: "PDF", size: "3.4 MB" },
              { title: "Annual Report 2023", type: "PDF", size: "5.2 MB" },
            ].map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md border border-yellow-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg">
                    <Download size={24} />
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {resource.type}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{resource.size}</p>
                <button className="w-full bg-[#1a1a2e] hover:bg-[#1a1a2e]/90 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center">
                  <Download size={16} className="mr-2" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CabinetsPage;
