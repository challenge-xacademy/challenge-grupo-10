describe('Challengue Grupo 10 / TC-010: Agregar producto al carrito', () => {

  beforeEach(() => {
    // Login usando el fixture de usuarios
    cy.fixture('users').then((users) => {
      cy.visit('/auth/login');
      cy.get('[data-test="email"]').type(users.validUser.email);
      cy.get('[data-test="password"]').type(users.validUser.password);
      cy.get('[data-test="login-submit"]').click();
      // Esperar redirección al home tras el login
      cy.url().should('not.include', '/auth/login');
    });
  });

  it('TC-010-A: Usuario logueado puede agregar un producto al carrito y ve el toast', () => {
    // 1. Ir al catálogo desde la navbar
    cy.get('.navbar-brand').click();

    // 2. Clic en el primer producto (UUID desconocido → usamos selector parcial ^=)
    cy.get('[data-test^="product-"]').first().click();
    cy.url().should('include', '/product/');

    // 3. Agregar al carrito
    cy.get('[data-test="add-to-cart"]').should('be.visible').click();

    // 4. Verificar toast de confirmación
    cy.get('[data-test="nav-cart"] > .ng-fa-icon > .svg-inline--fa')
      .should('be.visible')
      .and('contain.text', 'Product added to shopping cart.');
  });

  it('TC-010-B: El contador del carrito incrementa al agregar un producto', () => {
    cy.get('.navbar-brand').click();

    // Capturar cantidad inicial del badge del carrito
    cy.get('[data-test="cart-quantity"]')
      .invoke('text')
      .then((inicial) => {
        const cantidadInicial = parseInt(inicial.trim() || '0', 10);

        // Clic en el primer producto y agregar al carrito
        cy.get('[data-test^="product-"]').first().click();
        cy.get('[data-test="add-to-cart"]').click();

        // El badge debe haber incrementado
        cy.get('[data-test="cart-quantity"]')
          .should('be.visible')
          .invoke('text')
          .then((final) => {
            expect(parseInt(final.trim(), 10)).to.be.greaterThan(cantidadInicial);
          });
      });
  });

  it('TC-010-C: El producto agregado aparece en la vista del carrito', () => {
    cy.get('.navbar-brand').click();

    // Capturar el nombre del primer producto antes de entrar al detalle
    cy.get('[data-test^="product-"]').first()
      .find('.card-title')
      .invoke('text')
      .then((nombreProducto) => {

        // Entrar al detalle y agregar al carrito
        cy.get('[data-test^="product-"]').first().click();
        cy.get('[data-test="add-to-cart"]').click();

        // Ir al carrito
        cy.get('[data-test="nav-cart"]').click();
        cy.url().should('include', '/checkout');

        // Verificar que el producto está listado en el carrito
        cy.get('[data-test="product-title"]')
          .should('be.visible')
          .and('contain.text', nombreProducto.trim());
      });
  });

});
