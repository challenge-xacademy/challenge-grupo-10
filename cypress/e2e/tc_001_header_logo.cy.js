describe('Header / UI - TC-001: Logotipo principal', () => {

    beforeEach(() => {
      // 1. Cargar la página principal
      cy.visit('/');
    });
  
    it('TC-001: Verificar carga del logotipo principal en la barra de navegación', () => {
      // Localizar el enlace de la marca en la barra de navegación
      cy.get('a.navbar-brand')
        .should('be.visible')
        .within(() => {
          // 2. Inspeccionar la etiqueta img o svg del logo
          cy.get('img, svg')
            .should('be.visible')
            .then(($el) => {
              // Validación específica si se renderiza como imagen (<img>)
              if ($el.is('img')) {
                // Validar que la imagen realmente cargó y no está rota (naturalWidth > 0)
                expect($el[0].naturalWidth).to.be.greaterThan(0);
                expect($el[0].naturalHeight).to.be.greaterThan(0);
              }
            });
        });
    });
  
  });