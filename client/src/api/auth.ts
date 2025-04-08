interface LoginInput {
  username: string;
  password: string;
}

interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

export async function login(credentials: LoginInput): Promise<AuthResponse> {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${errorText}`);
  }

  return response.json();
}

export async function register(details: RegisterInput): Promise<AuthResponse> {
  const response = await fetch('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(details),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Registration failed: ${errorText}`);
  }

  return response.json();
}


// interface LoginInput {
//     username: string;
//     password: string;
//   }
  
//   interface AuthResponse {
//     token: string;
//   }
  
//   export async function login(credentials: LoginInput): Promise<AuthResponse> {
//     const response = await fetch('/auth/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     });
  
//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Login failed: ${errorText}`);
//     }
  
//     return response.json();
//   }
  