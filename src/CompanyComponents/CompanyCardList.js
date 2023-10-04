import CompanyCard from "./CompanyCard";

/** CompanyCardList: renders CompanyCards from passed array
 *
 * props:
 * - companies: [{ company information }, ...]
 *
 * CompanyList->CompanyCardList->CompanyCard
 */
function CompanyCardList({ companies }) {

  return (
    <>
      {companies.map(c => <CompanyCard key={c.handle} companyData={c} />)}
    </>
  );

}

export default CompanyCardList;
