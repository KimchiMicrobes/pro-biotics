
export const fetchTableData = async () => {
    const response = await fetch('https://api.airtable.com/v0/apprcDgIMqEGyiLcq/tblhpaAJKwbEUEqMb?',{
        headers:{
            Authorization: 'Bearer keyFE5jbFBaIzn1m0'
        }
    })
    const responseJson = await response.json()
    return responseJson.records

}