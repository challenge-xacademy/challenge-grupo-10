describe('Challengue Grupo 10', () => {

  beforeEach(() => {
    // Al haber configurado baseUrl, solo necesitas '/'
    cy.visit('/');
  });

  it('TC-01: Validar carga de página principal y catálogo de productos', () => {
    // Verificar que el título o logo sea visible
    cy.get('a.navbar-brand').should('be.visible');

    // Validar que se rendericen tarjetas de productos en el catálogo
    cy.get('.card').should('have.length.greaterThan', 0);
  });

  it('TC-02: Buscar un producto y filtrar resultados', () => {
    const terminoBusqueda = 'Hammer';

    // Localizar la barra de búsqueda y escribir
    cy.get('[data-test="search-query"]').type(`${terminoBusqueda}`);
    cy.get('[data-test="search-submit"]').click();

    // Validar que los resultados contengan el término buscado
    cy.get('.card-title')
      .should('be.visible')
      .and('contain.text', terminoBusqueda);
  });

});