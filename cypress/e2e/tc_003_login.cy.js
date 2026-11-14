describe('Challengue Grupo 10 / TC-003: Login', () => {
    beforeEach(() => {
        cy.visit('https://practicesoftwaretesting.com/auth/login')
    })
    
        it('login vacio', () => {
           cy.get("[data-test='login-submit']").click()
           //const name = 'inválidas'
           cy.get('[data-test="email-error"] > div').should('be.visible')
           cy.get('[data-test="password-error"] > div').should('be.visible')
        })
    
        it('login con usuario y contraseña inválidos', () => {  
            cy.get('[data-test="email"]').type('usuario@invalido')
            cy.get('[data-test="password"]').type('contraseña_invalida')
            cy.get('[data-test="login-submit"]').click()
            cy.contains(`Invalid email or password`).should('be.visible')
        } )
    
        it('login con usuario y contraseña válidos', () => {
            cy.get('[data-test="email"]').type('customer@practicesoftwaretesting.com')
            cy.get('[data-test="password"]').type('cowelcome01')
            cy.get('[data-test="login-submit"]').click()
            //cy.contains(`Inicio de sesión exitoso. Redirigiendo...`).should('be.visible')
        
           
        })
    })