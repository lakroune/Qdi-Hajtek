import JobCard from "../components/cards/JobCard";
import OffreViewCard from "../components/cards/OffreViewCard";

const ClientListOffres = () => {
    const jobs = [
        {
            id: 'JOB-001',
            title: 'Fuite d\'eau urgente salle de bain - Intervention immédiate',
            category: 'Plomberie',
            description: 'Fuite importante sous le lavabo depuis ce matin. Eau qui coule continuellement. Besoin d\'intervention dans l\'heure si possible. Immeuble résidentiel au 3ème étage, accès facile.',
            budget: '200-400 DH',
            urgency: 'urgent',
            location: 'Casablanca, Anfa',
            preferredDate: 'Aujourd\'hui',
            publishedAt: 'il y a 2h',
            status: 'pending',

            client: {
                name: 'Ahmed Benali',
                phone: '+212 6 11 22 33 44',
                email: 'ahmed.benali@email.com',
                city: 'Casablanca',
                memberSince: '2023-06-15',
                completedJobs: 12
            }
        },
        {
            id: 'JOB-002',
            title: 'Installation luminaires salon + 2 chambres',
            category: 'Électricité',
            description: '4 luminaires à installer (lustre salon + 3 suspensions chambres). Câblage déjà existant, juste à remplacer anciens luminaires. Disponible samedi ou dimanche matin.',
            budget: '500-800 DH',
            urgency: 'standard',
            location: 'Rabat, Agdal',
            preferredDate: '2024-01-20',
            publishedAt: '2024-01-14',
            status: 'approved',
            approvedAt: '2024-01-14 18:00',
            approvedBy: 'Admin',

            client: {
                name: 'Sofia Alaoui',
                phone: '+212 6 22 33 44 55',
                email: 'sofia.alaoui@email.com',
                city: 'Rabat',
                memberSince: '2023-08-20',
                completedJobs: 5
            }
        },
        {
            id: 'JOB-003',
            title: 'Rénovation complète cuisine 15m²',
            category: 'Plomberie',
            description: 'Démontage ancienne cuisine, nouvelle installation évier, robinetterie, raccordement électroménager (four, plaques, hotte). Carrelage et peinture à prévoir aussi.',
            budget: '15000+ DH',
            urgency: 'planned',
            location: 'Marrakech, Guéliz',
            preferredDate: '2024-02-01',
            publishedAt: '2024-01-13',
            status: 'rejected',
            rejectedAt: '2024-01-13 15:30',
            rejectedBy: 'Admin',
            rejectionReason: 'Budget non réaliste pour la description fournie. Demander devis détaillé et préciser les travaux.',

            client: {
                name: 'Karim Tazi',
                phone: '+212 6 33 44 55 66',
                email: 'karim.tazi@email.com',
                city: 'Marrakech',
                memberSince: '2023-11-05',
                completedJobs: 2
            }
        }
    ];
    return (


        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {jobs.map((job) => (
                    <OffreViewCard  offre={job} />
                ))}
            </div>
        </div>

    );
}


export default ClientListOffres;