describe('Challengue Grupo 10 / TC-006: Filtro por categoría en Sidebar', () => {

  beforeEach(() => {
    cy.visit('/');
    // Esperar a que el catálogo cargue
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  it('TC-006-A: Al seleccionar una categoría el catálogo se actualiza con productos', () => {
    // 1. Capturar los títulos de los productos ANTES del filtro
    cy.get('.card-title').then(($antes) => {
      const titulosAntes = [...$antes].map((el) => el.innerText.trim());

      // 2. Hacer clic en el checkbox de la primera categoría del sidebar
      cy.get('[data-test^="category-"]').first().click();

      // 3. Esperar a que el catálogo se actualice (al menos 1 producto visible)
      cy.get('.card').should('have.length.greaterThan', 0);

      // 4. Verificar que el catálogo cambió respecto al estado inicial
      cy.get('.card-title').then(($despues) => {
        const titulosDespues = [...$despues].map((el) => el.innerText.trim());
        // La lista de productos debe ser diferente a la inicial
        expect(titulosDespues).to.not.deep.equal(titulosAntes);
      });
    });
  });

  it('TC-006-B: Seleccionar categoría "Hammer" muestra productos', () => {
    // Las categorías son checkboxes — usamos su label para hacer clic
    cy.contains('label', 'Hammer').click();

    // Verificar que hay productos visibles después del filtro
    cy.get('.card').should('have.length.greaterThan', 0);
    cy.get('.card-title').first().should('be.visible');
  });

  it('TC-006-C: La categoría seleccionada queda marcada (checked)', () => {
    // El elemento es <input class="icheck"> → verificar con be.checked
    cy.get('[data-test^="category-"]').first().as('primerCategoria');

    // Verificar que antes NO está marcada
    cy.get('@primerCategoria').should('not.be.checked');

    // Hacer clic para activarla
    cy.get('@primerCategoria').click();

    // Verificar que quedó marcada
    cy.get('@primerCategoria').should('be.checked');
  });

});
