import { Link } from "react-router-dom";

/** CompanyCard: displays company information, links to CompanyDetail
 *
 * props:
 * - companyData: { handle, name, description, numEmployees, logoUrl }
 *
 * CompanyCardList->CompanyCard
 */
function CompanyCard({ companyData }) {
  return ( //TODO: all'a this!
    <Link to={`/companies/${companyData.handle}`}>
      <h1>Hi, I'm {companyData.name}</h1>
    </Link>
  );
}

export default CompanyCard;
