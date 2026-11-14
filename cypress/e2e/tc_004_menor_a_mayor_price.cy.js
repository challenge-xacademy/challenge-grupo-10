describe('Barra Lateral - TC-004: Ordenamiento por precio de menor a mayor', () => {

  beforeEach(() => {
    // 1. Cargar el catálogo principal
    cy.visit('/');

    // Asegurar que las tarjetas de productos estén visibles antes de interactuar
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  it('TC-004: Ordenar catálogo de productos por precio de menor a mayor', () => {
    // 1. Seleccionar la opción de ordenamiento directamente
    cy.get('select[data-test="sort"]')
      .should('be.visible')
      .select('price,asc');

    // 2. Cypress reintentará automáticamente hasta que el primer elemento sea el esperado
    // Esto sustituye la necesidad de cy.wait() de red
    //cy.get('.card-title')
      //.first()
      //.should('contain.text', 'Slip Joint Pliers');
//
    // 3. Validar que los precios visibles estén ordenados ascendentemente
    cy.get('[data-test="product-price"]')
      .should('have.length.greaterThan', 0)
      .then(($precios) => {
        const valores = [...$precios].map((el) =>
          parseFloat(el.innerText.replace('$', '').trim())
        );
        const copiaOrdenada = [...valores].sort((a, b) => a - b);
        expect(valores).to.deep.equal(copiaOrdenada);
      });
  });

});