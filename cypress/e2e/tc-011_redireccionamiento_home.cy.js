describe('Challengue Grupo 10 / TC-011: Redireccionamiento al Home desde el carrito', () => {

  // ⚠️  Este test usa la versión CON BUGS del sitio para detectar el bug de navegación
  const BASE_WITH_BUGS = 'https://with-bugs.practicesoftwaretesting.com/#';

  beforeEach(() => {
    cy.visit(`${BASE_WITH_BUGS}/`);
    // Esperar a que el catálogo cargue
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // TC-011-A: BUG — El botón "Home" desde el carrito redirige a /contact
  // ─────────────────────────────────────────────────────────────────────────
  it('TC-011-A: El botón Home desde el carrito debe redirigir al Home (no a Contact)', () => {
    // 1. Agregar el primer producto al carrito sin login (modo guest si está permitido)
    cy.get('.card').first().click();
    cy.get('[data-test="add-to-cart"]').click();

    // 2. Ir al carrito
    cy.get('[data-test="nav-cart"]').click();
    cy.url().should('include', '/checkout');

    // 3. Manejar menú hamburguesa en mobile
    cy.get('body').then(($body) => {
      if ($body.find('.navbar-toggler').is(':visible')) {
        cy.get('.navbar-toggler').click();
      }
    });

    // 4. Hacer clic en el enlace "Home" de la navbar
    cy.get('[data-test="nav-home"]').click();

    // 5. Aserciones:
    // ❌ BUG DETECTADO: La URL actual incluye /contact en vez de ir al Home
    cy.url().should('not.include', '/contact',
      'BUG: El botón Home redirige a /contact en lugar del Home');

    // ✅ COMPORTAMIENTO ESPERADO: La URL debe ser la raíz
    cy.url().should('eq', `${BASE_WITH_BUGS}/`);

    // ✅ El catálogo de productos debe ser visible (confirmación visual del Home)
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // TC-011-B: El botón Home desde la página de un producto redirige correctamente
  // ─────────────────────────────────────────────────────────────────────────
  it('TC-011-B: El botón Home desde el detalle de producto redirige al Home', () => {
    // 1. Entrar al detalle de un producto
    cy.get('.card').first().click();
    cy.url().should('include', '/product/');

    // 2. Hacer clic en Home
    cy.get('[data-test="nav-home"]').click();

    // 3. Verificar redirección correcta
    cy.url().should('not.include', '/contact');
    cy.url().should('eq', `${BASE_WITH_BUGS}/`);
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // TC-011-C: El logo de la navbar también redirige al Home desde el carrito
  // ─────────────────────────────────────────────────────────────────────────
  it('TC-011-C: El logo de la navbar redirige al Home desde el carrito', () => {
    // 1. Agregar producto y navegar al carrito
    cy.get('.card').first().click();
    cy.get('[data-test="add-to-cart"]').click();
    cy.get('[data-test="nav-cart"]').click();
    cy.url().should('include', '/checkout');

    // 2. Hacer clic en el logo/navbar-brand
    cy.get('.navbar-brand').click();

    // 3. Verificar redirección correcta
    cy.url().should('not.include', '/contact');
    cy.url().should('eq', `${BASE_WITH_BUGS}/`);
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  


});

  


