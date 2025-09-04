import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Filter, TrendingUp, Target, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

const Dashboard = () => {
  const [selectedTrimestre, setSelectedTrimestre] = useState('CUMUL');
  const [selectedCategorie, setSelectedCategorie] = useState('Tous');

  const rawData = [
    { indicateur: '1.1', description: 'Villages certifiés ODF', cible: 239, t2: 0, t3: 0, t4: 205, cumul: 205, etat: 'En bonne voie', categorie: 'Assainissement' },
    { indicateur: '1.2', description: 'Personnes dans villages ODF', cible: 75472, t2: 0, t3: 0, t4: 41234, cumul: 41234, etat: 'En bonne voie', categorie: 'Assainissement' },
    { indicateur: '1.3', description: 'Personnes avec services assainissement de base', cible: 60510, t2: 11549, t3: 33246, t4: 6281, cumul: 51076, etat: 'En bonne voie', categorie: 'Assainissement' },
    { indicateur: '1.4', description: 'Services gérés en sécurité (arborloo)', cible: 1918, t2: 0, t3: 42, t4: 0, cumul: 42, etat: 'Absence de progrès', categorie: 'Assainissement' },
    { indicateur: '1.5', description: 'Ménages modernisant toilettes', cible: 15130, t2: 561, t3: 126, t4: 95, cumul: 782, etat: 'En bonne voie', categorie: 'Assainissement' },
    { indicateur: '1.6', description: 'Femmes - hygiène menstruelle', cible: 9109, t2: 531, t3: 140, t4: 6277, cumul: 6948, etat: 'En bonne voie', categorie: 'Hygiène' },
    { indicateur: '1.7', description: 'Femmes couvertes communication', cible: 9109, t2: 5965, t3: 3150, t4: 2285, cumul: 11400, etat: 'Réalisé', categorie: 'Communication' },
    { indicateur: '1.8', description: 'Écoles EAH 1 étoile', cible: 40, t2: 0, t3: 0, t4: 9, cumul: 9, etat: 'En bonne voie', categorie: 'Éducation' },
    { indicateur: '1.9', description: 'Écoles EAH 2 étoiles', cible: 4, t2: 0, t3: 0, t4: 0, cumul: 0, etat: 'Absence de progrès', categorie: 'Éducation' },
    { indicateur: '1.10', description: 'Écoles standards nationaux', cible: 2, t2: 0, t3: 0, t4: 0, cumul: 0, etat: 'Absence de progrès', categorie: 'Éducation' },
    { indicateur: '1.11', description: 'Centres santé EAH 1 étoile', cible: 5, t2: 0, t3: 2, t4: 0, cumul: 2, etat: 'En bonne voie', categorie: 'Santé' },
    { indicateur: '1.12', description: 'Centres santé EAH 2 étoiles', cible: 2, t2: 0, t3: 1, t4: 0, cumul: 1, etat: 'En bonne voie', categorie: 'Santé' },
    { indicateur: '1.13', description: 'Centres santé standards nationaux', cible: 2, t2: 0, t3: 0, t4: 0, cumul: 0, etat: 'Absence de progrès', categorie: 'Santé' },
    { indicateur: '1.14', description: 'Entreprises fonctionnelles', cible: 12, t2: 24, t3: 0, t4: 0, cumul: 24, etat: 'Réalisé', categorie: 'Économique' },
    { indicateur: '1.15', description: 'Groupes VSLA', cible: 25, t2: 24, t3: 11, t4: 0, cumul: 35, etat: 'Réalisé', categorie: 'Économique' },
    { indicateur: '2.1', description: 'AGR créées', cible: 375, t2: 0, t3: 0, t4: 744, cumul: 744, etat: 'Réalisé', categorie: 'Économique' },
    { indicateur: '2.2', description: 'Ménages renforcés AGR', cible: 350, t2: 0, t3: 405, t4: 779, cumul: 1184, etat: 'Réalisé', categorie: 'Économique' },
    { indicateur: '2.3', description: 'Villages avec WSSP', cible: 40, t2: 0, t3: 0, t4: 20, cumul: 20, etat: 'En bonne voie', categorie: 'Eau' },
    { indicateur: '2.4', description: 'Personnes dans villages WSSP', cible: 4000, t2: 0, t3: 0, t4: 5757, cumul: 5757, etat: 'Réalisé', categorie: 'Eau' },
    { indicateur: '2.7', description: 'Personnes eau potable basic', cible: 33000, t2: 12830, t3: 0, t4: 0, cumul: 12830, etat: 'Absence de progrès', categorie: 'Eau' },
    { indicateur: '3.1', description: 'Acteurs communautaires ANJE/NdF/DPE', cible: 100, t2: 120, t3: 245, t4: 0, cumul: 365, etat: 'Réalisé', categorie: 'Nutrition' },
    { indicateur: '3.3', description: 'Mères formées PB', cible: 5685, t2: 597, t3: 3045, t4: 1602, cumul: 5244, etat: 'En bonne voie', categorie: 'Nutrition' },
    { indicateur: '3.5', description: 'Acteurs espaces mères-bébés', cible: 100, t2: 0, t3: 0, t4: 365, cumul: 365, etat: 'Réalisé', categorie: 'Nutrition' },
    { indicateur: '3.7', description: 'Ménages espace Mandady', cible: 153, t2: 69, t3: 191, t4: 137, cumul: 397, etat: 'Réalisé', categorie: 'Nutrition' },
    { indicateur: '3.8', description: 'Villages approche NTPC', cible: 46, t2: 0, t3: 28, t4: 31, cumul: 59, etat: 'Réalisé', categorie: 'Nutrition' },
    { indicateur: '3.9', description: 'Membres VSLA formés GEC Nutrition', cible: 25, t2: 0, t3: 142, t4: 103, cumul: 245, etat: 'Réalisé', categorie: 'Nutrition' },
    { indicateur: '3.10', description: 'Mères SPC counseling ANJE', cible: 300, t2: 394, t3: 2687, t4: 1465, cumul: 4546, etat: 'Réalisé', categorie: 'Nutrition' },
    { indicateur: '3.11', description: 'Groupes soutien ANJE', cible: 80, t2: 84, t3: 8, t4: 0, cumul: 92, etat: 'Réalisé', categorie: 'Nutrition' },
    { indicateur: '4.1', description: 'Communes gouvernance EAH', cible: 6, t2: 6, t3: 0, t4: 0, cumul: 6, etat: 'Réalisé', categorie: 'Gouvernance' },
    { indicateur: '4.3', description: 'Communes pacte durabilité', cible: 6, t2: 6, t3: 5, t4: 6, cumul: 17, etat: 'Réalisé', categorie: 'Gouvernance' }
  ];

  const categories = ['Tous', 'Assainissement', 'Hygiène', 'Communication', 'Éducation', 'Santé', 'Économique', 'Eau', 'Nutrition', 'Gouvernance'];

  const filteredData = useMemo(() => {
    let filtered = rawData;
    if (selectedCategorie !== 'Tous') {
      filtered = filtered.filter(item => item.categorie === selectedCategorie);
    }
    return filtered;
  }, [selectedCategorie]);

  const chartData = useMemo(() => {
    return filteredData.map(item => ({
      indicateur: item.indicateur,
      cible: item.cible,
      realisation: selectedTrimestre === 'T2' ? item.t2 :
                   selectedTrimestre === 'T3' ? item.t3 :
                   selectedTrimestre === 'T4' ? item.t4 :
                   item.cumul,
      pourcentage: Math.round((selectedTrimestre === 'T2' ? item.t2 :
                              selectedTrimestre === 'T3' ? item.t3 :
                              selectedTrimestre === 'T4' ? item.t4 :
                              item.cumul) / item.cible * 100)
    }));
  }, [filteredData, selectedTrimestre]);

  const evolutionData = useMemo(() => {
    return filteredData.map(item => ({
      indicateur: item.indicateur,
      T2: item.t2,
      T3: item.t3,
      T4: item.t4,
      Cumul: item.cumul,
      Cible: item.cible
    }));
  }, [filteredData]);

  const statistiques = useMemo(() => {
    const total = filteredData.length;
    const realise = filteredData.filter(item => item.etat === 'Réalisé').length;
    const enBonneVoie = filteredData.filter(item => item.etat === 'En bonne voie').length;
    const absenceProgres = filteredData.filter(item => item.etat === 'Absence de progrès').length;

    return { total, realise, enBonneVoie, absenceProgres };
  }, [filteredData]);

  const pieData = [
    { name: 'Réalisé', value: statistiques.realise, color: '#10b981' },
    { name: 'En bonne voie', value: statistiques.enBonneVoie, color: '#f59e0b' },
    { name: 'Absence de progrès', value: statistiques.absenceProgres, color: '#ef4444' }
  ];

  const getStatusIcon = (etat) => {
    switch (etat) {
      case 'Réalisé': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'En bonne voie': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'Absence de progrès': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tableau de Bord - Réalisation des Indicateurs</h1>
        
        {/* Filtres */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-700">Filtres:</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Trimestre</label>
              <select
                value={selectedTrimestre}
                onChange={(e) => setSelectedTrimestre(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="T2">T2</option>
                <option value="T3">T3</option>
                <option value="T4">T4</option>
                <option value="CUMUL">Cumul</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Catégorie</label>
              <select
                value={selectedCategorie}
                onChange={(e) => setSelectedCategorie(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Indicateurs</p>
                <p className="text-2xl font-bold text-gray-900">{statistiques.total}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Réalisé</p>
                <p className="text-2xl font-bold text-green-600">{statistiques.realise}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En bonne voie</p>
                <p className="text-2xl font-bold text-yellow-600">{statistiques.enBonneVoie}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Absence de progrès</p>
                <p className="text-2xl font-bold text-red-600">{statistiques.absenceProgres}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Graphiques */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Graphique en barres - Comparaison Cible vs Réalisation */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Comparaison Cible vs Réalisation ({selectedTrimestre})
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="indicateur" 
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
                <Legend />
                <Bar dataKey="cible" fill="#3b82f6" name="Cible" />
                <Bar dataKey="realisation" fill="#10b981" name="Réalisation" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Graphique en camembert - Répartition des états */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">État des Indicateurs</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Évolution par trimestre */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Évolution des Réalisations par Trimestre</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={evolutionData.slice(0, 10)} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="indicateur" 
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis />
              <Tooltip formatter={(value, name) => [value.toLocaleString(), name]} />
              <Legend />
              <Line type="monotone" dataKey="T2" stroke="#8884d8" name="T2" strokeWidth={2} />
              <Line type="monotone" dataKey="T3" stroke="#82ca9d" name="T3" strokeWidth={2} />
              <Line type="monotone" dataKey="T4" stroke="#ffc658" name="T4" strokeWidth={2} />
              <Line type="monotone" dataKey="Cible" stroke="#ff7300" name="Cible" strokeDasharray="5 5" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tableau détaillé */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Tableau Détaillé des Indicateurs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Indicateur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cible</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">T2</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">T3</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">T4</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cumul</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">% Réalisation</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">État</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item) => {
                  const pourcentage = Math.round(item.cumul / item.cible * 100);
                  return (
                    <tr key={item.indicateur} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.indicateur}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">{item.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.categorie}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.cible.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.t2.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.t3.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.t4.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.cumul.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pourcentage >= 100 ? 'bg-green-100 text-green-800' :
                          pourcentage >= 50 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {pourcentage}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.etat)}
                          <span>{item.etat}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;