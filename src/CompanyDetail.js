import JoblyApi from "./api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "./JobCardList";

/** CompanyDetail: displays jobs listed by specified company
 *
 * RoutesList->CompanyDetail->JobCardList
*/
function CompanyDetail() {
  const [company, setCompany] = useState(null);
  const { handle } = useParams();

  //fetch company details, with jobs, on initial render
  useEffect(() => {
    async function getCompanyData() {
      const details = await JoblyApi.getCompany(handle);
      setCompany(details);
    }
    getCompanyData();
  }, []);

  if (!company) {
    return <h1>Loading...</h1>;
  }

  return ( //TODO: this for real
    <div className="CompanyDetail">
      <h1>Info for {company.name}</h1>
      <JobCardList jobs={company.jobs} />
    </div>
  );

}

export default CompanyDetail;
