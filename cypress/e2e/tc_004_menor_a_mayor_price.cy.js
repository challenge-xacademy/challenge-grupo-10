describe('Barra Lateral - TC-004: Ordenamiento por precio de menor a mayor', () => {

    beforeEach(() => {
      // 1. Cargar el catálogo principal
      cy.visit('/');
  
      // Asegurar que las tarjetas de productos carguen antes de interactuar
      cy.get('.card').should('have.length.greaterThan', 0);
    });
  
    it('TC-004: Ordenar catálogo de productos por precio de menor a mayor', () => {
      // Interceptar la llamada de la API del catálogo para sincronizar la recarga tras ordenar
      cy.intercept('GET', '**/products**').as('getProductsSorted');
  
      // 1 y 2. Desplegar el select y elegir 'Price (Low - High)'
      // En la plataforma, el select usa data-test="sort" y el value correspondiente es "price,asc"
      cy.get('[data-test="sort"]').select('Price (Low - High)');
  
      // Esperar a que la petición del ordenamiento termine y la interfaz se actualice
      cy.wait('@getProductsSorted');
  
      // Validación A: Validar el primer producto esperado según la matriz de pruebas
      cy.get('.card-title')
        .first()
        .should('contain.text', 'Slip Joint Pliers');
  
      // Validación B: Comprobación algorítmica de orden ascendente en todos los precios visibles
      cy.get('[data-test="product-price"]')
        .should('have.length.greaterThan', 0)
        .then(($precios) => {
          // Extraer los valores numéricos limpiando el signo '$'
          const listaPrecios = [...$precios].map(el => 
            parseFloat(el.innerText.replace('$', '').trim())
          );
  
          // Crear una copia ordenada de menor a mayor
          const listaOrdenada = [...listaPrecios].sort((a, b) => a - b);
  
          // Validar que la lista obtenida del DOM coincida con el orden numérico ascendente
          expect(listaPrecios).to.deep.equal(listaOrdenada);
        });
    });
  
  });