import { AlertTriangle, CheckCircle } from "lucide-react"

export default function SafetyCompliancePage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-teal-900 mb-4 flex items-center space-x-3">
          <CheckCircle className="text-green-500" size={40} />
          <span>Safety & Compliance</span>
        </h1>
        <p className="text-gray-600 mb-12">Government regulations and safe pesticide usage guidelines</p>

        {/* Government Regulations */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Government Regulations Dashboard</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Pesticide Registration Status",
                desc: "All products with valid CIB&RC approval",
                status: "✓ Compliant",
              },
              {
                title: "Maximum Residue Limits (MRL)",
                desc: "By crop-pesticide combination",
                status: "✓ Within Limits",
              },
              {
                title: "Banned/Restricted Chemicals",
                desc: "Clear listing with alternatives",
                status: "✓ Approved Only",
              },
              {
                title: "Organic Compatibility",
                desc: "Products compatible with organic certification",
                status: "✓ Suitable Options",
              },
            ].map((item, i) => (
              <div key={i} className="bg-teal-50 p-6 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold text-teal-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 text-sm mb-3">{item.desc}</p>
                <p className="font-bold text-green-600">{item.status}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dosage Compliance Checker */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Dosage Compliance Checker</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Product</label>
              <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none">
                <option>ATRATAF (Atrazine 50% WP)</option>
                <option>ALL CLEAR (Carbendazim)</option>
                <option>SPRINT (Cypermethrin)</option>
                <option>INDOFIL (Mancozeb)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Crop</label>
              <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none">
                <option>Rice</option>
                <option>Wheat</option>
                <option>Cotton</option>
                <option>Tomato</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Area (acres)</label>
              <input
                type="number"
                placeholder="1"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-lime-50 p-6 rounded-lg border-2 border-lime-400">
            <div className="flex items-center space-x-4 mb-4">
              <CheckCircle className="text-green-600" size={28} />
              <h3 className="text-lg font-bold text-teal-900">Recommended Dosage</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Dosage</p>
                <p className="text-2xl font-bold text-lime-600">500g/acre</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="text-green-600 font-bold">✓ Within Limits</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Gov. Limit</p>
                <p className="text-2xl font-bold text-teal-900">1000g/acre</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Safety Margin</p>
                <p className="text-green-600 font-bold">50% Below Limit</p>
              </div>
            </div>
          </div>
        </div>

        {/* PHI Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Pre-Harvest Interval (PHI) Calculator</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-bold mb-2">Product</label>
              <select className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none">
                <option>ATRATAF (45 days PHI)</option>
                <option>ALL CLEAR (14 days PHI)</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">Last Spray Date</label>
              <input
                type="date"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:border-lime-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2">&nbsp;</label>
              <button className="w-full bg-lime-400 text-teal-900 py-2 rounded-lg font-bold hover:bg-lime-300 transition">
                Calculate Safe Harvest Date
              </button>
            </div>
          </div>

          <div className="bg-green-50 p-6 rounded-lg border-2 border-green-500">
            <h3 className="font-bold text-teal-900 mb-4">Safe to Harvest On:</h3>
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-green-100 rounded-lg flex items-center justify-center text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">Feb 28</p>
                  <p className="text-xs text-gray-600">45 days from now</p>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-700 mb-2">
                  You can safely harvest your crops on <strong>February 28, 2025</strong>
                </p>
                <p className="text-sm text-gray-600">
                  This ensures pesticide residues are within safe limits for human consumption.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-teal-900 mb-6">Environmental Impact Scores</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "ATRATAF", water: 2, bee: 1, soil: 90 },
              { name: "ALL CLEAR", water: 1, bee: 1, soil: 30 },
            ].map((product) => (
              <div key={product.name} className="bg-teal-50 p-6 rounded-lg border-2 border-teal-200">
                <h3 className="font-bold text-teal-900 mb-4 text-lg">{product.name}</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Water Toxicity</span>
                      <span className="font-bold text-teal-900">{product.water}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full">
                      <div
                        className="bg-blue-500 h-3 rounded-full"
                        style={{ width: `${(product.water / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Bee Toxicity</span>
                      <span className="font-bold text-teal-900">{product.bee}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 h-3 rounded-full">
                      <div
                        className="bg-yellow-500 h-3 rounded-full"
                        style={{ width: `${(product.bee / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-700 mb-1">
                      Soil Persistence: <span className="font-bold text-teal-900">{product.soil} days</span>
                    </p>
                    <p className="text-xs text-gray-600">Time to degrade to 1% concentration</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-teal-200">
                  <p className="text-sm text-gray-700">
                    Overall Rating: <span className="font-bold text-green-600">Low Environmental Risk</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* First Aid & Emergency */}
        <div className="bg-red-50 rounded-lg p-8 border-2 border-red-400">
          <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center space-x-2">
            <AlertTriangle size={28} />
            <span>First Aid & Emergency Response</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-bold text-red-900 mb-4">Poisoning Symptoms</h3>
              <ul className="space-y-2 text-gray-700">
                <li>🔴 Nausea and vomiting</li>
                <li>🔴 Dizziness and headache</li>
                <li>🔴 Difficulty breathing</li>
                <li>🔴 Excessive salivation</li>
                <li>🔴 Muscle twitching</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-red-900 mb-4">Immediate Actions</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                <li>Move to fresh air immediately</li>
                <li>Remove contaminated clothing</li>
                <li>Wash skin with soap and water</li>
                <li>Call poison control center</li>
                <li>Keep product container for reference</li>
              </ol>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border-l-4 border-red-500">
            <h3 className="font-bold text-teal-900 mb-4">Emergency Contacts</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600 text-sm">National Poison Control</p>
                <p className="text-xl font-bold text-red-600">1800-112-117</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Medical Helpline</p>
                <p className="text-xl font-bold text-red-600">+91-011-4155-0060</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Anand Agro Support</p>
                <p className="text-xl font-bold text-red-600">+91-9999-999-999</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
