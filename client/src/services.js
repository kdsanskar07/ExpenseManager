const fetchRequest = async (requestBody, sendToken) => {
  const authToken = localStorage.getItem('token');
  try {
    const response = await fetch(window.URL.link, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sendToken ? authToken : ''
      }
    })
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

const sendSignInData = async (data) => {
  let requestBody = {
    query: `
            query{
                login(authInput:{email:"${data.email}",password:"${data.password}"}){
                id,
                token,
                tokenExpiration
                }
            }`,
  }
  return await fetchRequest(requestBody, false);
}

const sendSignUpData = async (data) => {
  let requestBody = {
    query: `
            mutation{
                createUser(userInput: {email: "${data.email}", password: "${data.password}", name: "${data.name}"}) {
                    id
                    token
                    tokenExpiration
                }}`,
  }
  return await fetchRequest(requestBody, false);
}


const getDashboardData = async () => {
  let requestBody = {
    query: `
        query{
            dashboard{
              transaction{
                title
                amount
                note
                date
                tag
                type
              }
              userExpense{
                totalIncome
                totalExpense
              }
            }
        }`,
  }
  return await fetchRequest(requestBody, true);
}
const createNewTransaction = async (data) => {
  let requestBody = {
    query: `mutation{
            createTransaction(transactionInput:{
              title:"${data.title}",
              note:"${data.note}"
              amount:${data.amount},
              date:"${data.date}"
              tag:"${data.tag}"
              type:"${data.type}"
            }){
              msg
            }
          }`,
  }
  return await fetchRequest(requestBody, true);
}
const getMyTransactions = async () => {
  let requestBody = {
    query: `
        query{
            transaction{
              title,
              amount,
              note,
              date,
              tag,
            }
          }`,
  }
  return await fetchRequest(requestBody, true);
}

const getReports = async () => {
  let requestBody = {
    query: `query{
            report{
              weekly{
                week1
                week2
                week3
                week4
              }
              categorically{
                food
                fuel
                others
                shopping
                home
              }
            }
          }`,
  }
  return await fetchRequest(requestBody, true);
}

export {
  getDashboardData,
  sendSignInData,
  sendSignUpData,
  createNewTransaction,
  getMyTransactions,
  getReports
};