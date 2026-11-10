describe('Barra Lateral - TC-003: Encabezado de ordenamiento', () => {

    beforeEach(() => {
      // 1. Visitar la página principal
      cy.visit('/');
    });
  
    it('TC-003: Validar la etiqueta del encabezado de ordenamiento', () => {
      // 1. Localizar la barra lateral izquierda (filtros/ordenamiento)
      // En la plataforma, el select de ordenamiento o su contenedor incluye la etiqueta "Sort"
      cy.get('[data-test="sort"]')
        .should('be.visible')
        .parent()
        .within(() => {
          // Validar que la etiqueta (label o encabezado) contenga exactamente "Sort"
          cy.get('label, h4, h5')
            .should('be.visible')
            .and('have.text', 'Sort');
        });
    });
  
  });