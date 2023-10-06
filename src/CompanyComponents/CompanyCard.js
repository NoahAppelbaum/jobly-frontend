import { Link } from "react-router-dom";
import "../stylesheets/CompanyCard.css"

/** CompanyCard: displays company information, links to CompanyDetail
 *
 * props:
 * - companyData: { handle, name, description, numEmployees, logoUrl }
 *
 * CompanyCardList->CompanyCard
 */
function CompanyCard({ companyData }) {
  return ( //TODO: how did they do that whole-card-is-a-link trick on warbler?? Check their design/CSS
    <Link className="CompanyCard-link" to={`/companies/${companyData.handle}`}>
      <div className="CompanyCard">
        <h3>{companyData.name}</h3>

        {companyData.logoUrl?.length &&
          <img width={40} src={companyData.logoUrl} alt={`logo for ${companyData.name}`} />}

        <p>{companyData.description}</p>
      </div>
    </Link>
  );
}

export default CompanyCard;
