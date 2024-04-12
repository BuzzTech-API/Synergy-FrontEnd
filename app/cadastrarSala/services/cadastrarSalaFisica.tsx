
/*
 * envia o body para cadastro do usuário no backend
 *
 * */
export async function cadastrarSala(body: {}) {

    const request = fetch('http://localhost:5000/physicalrooms', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    const response = await request
    if(!response.ok) throw new Error
    return response.json()
  }