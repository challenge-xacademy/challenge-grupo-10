describe('Challengue Grupo 10 / TC-005: Enlace de Contacto en Navbar', () => {

    beforeEach(() => {
      // 1. Visitar la página principal
      cy.visit('/');
    });
  
    it('TC-002: Validar ortografía y redirección del enlace Contact en el menú superior', () => {
      // 1. Localizar el enlace de Contact en el menú superior mediante data-test
      const contactLink = cy.get('[data-test="nav-contact"]');
  
      // Validar visibilidad y texto ortográfico esperado
      contactLink
        .should('be.visible')
        .and('have.text', 'Contacto'); // Validar que no tenga faltas (ej. "Contakt")
  
      // 2. Hacer clic en el enlace de contacto
      contactLink.click();
  
      // Validar redirección de la URL
      cy.url().should('include', '/contact');
  
      // Validar que la vista de contacto cargó con su encabezado o formulario
      cy.get('h3, h1')
        .should('be.visible')
        .and('contain.text', 'Contacto');
    });
  
  });