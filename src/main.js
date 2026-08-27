const API_URL = '/api';

const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorEl = document.getElementById('error');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.textContent = '';
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email) {
        errorEl.textContent = 'Digite um email válido';
        return;
    }
    
    if (password.length < 8) {
        errorEl.textContent = 'A senha deve ter pelo menos 8 dígitos';
        return;
    }
    
    submitBtn.disabled = true;
    btnText.textContent = 'Entrando...';
    
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            form.innerHTML = `
                <div style="text-align: center; padding: 40px 0;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="#34A853"/>
                        <path d="M7 12l3 3 7-7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <h2 style="margin-top: 20px; color: #202124; font-weight: 400;">Login efetuado!</h2>
                    <p style="margin-top: 10px; color: #5f6368; font-size: 14px;">Bem-vindo, ${email}</p>
                </div>
            `;
        } else {
            errorEl.textContent = data.error || data.message || 'Erro ao fazer login';
            submitBtn.disabled = false;
            btnText.textContent = 'Login';
        }
    } catch (err) {
        errorEl.textContent = 'Erro de conexão';
        submitBtn.disabled = false;
        btnText.textContent = 'Login';
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length >= 8) {
        passwordInput.style.borderColor = '#34A853';
    } else {
        passwordInput.style.borderColor = '#dadce0';
    }
});
