
/*
 * envia o body para cadastro do usuário no backend
 *
 * */
export async function cadastrarUsuario(body: {}) {

  const request = fetch('http://localhost:5000/users', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const response = await request
  return response.json()
}
