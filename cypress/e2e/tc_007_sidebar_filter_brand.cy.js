describe('Challengue Grupo 10 / TC-007: Filtro por marca (Brand) en Sidebar', () => {

    beforeEach(() => {
      cy.visit('/');
      // Esperar a que el catálogo cargue
      cy.get('.card').should('have.length.greaterThan', 0);
    });
  
    it('TC-006-A: Al seleccionar una categoría, el catálogo se filtra y muestra resultados', () => {
      // 1. Capturar cantidad inicial de productos
      cy.get('.card').its('length').then((totalInicial) => {
  
        // 2. Hacer clic en el checkbox de la primera categoría del sidebar
        cy.get('[data-test^="brand-"]').first().click();  
  
        // 3. Esperar a que el catálogo se actualice
        cy.get('.card').should('have.length.greaterThan', 0);
  
        // 4. Verificar que el número de productos es menor o igual al total
        cy.get('.card').its('length').should('be.lte', totalInicial);
      });
    });
  
    it('TC-006-B: Seleccionar categoría "Marca: " muestra productos', () => {
      // Las categorías son checkboxes — usamos contains para encontrar su label
      cy.contains('label', 'ForgeFlex Tools').click();
  
      // Verificar que hay productos visibles después del filtro
      cy.get('.card').should('have.length.greaterThan', 0);
      cy.get('.card-title').first().should('be.visible');
    });
  
    it('TC-006-C: La categoría seleccionada queda marcada (checked)', () => {
    
      cy.get('[data-test^="brand-"]').first().click();
  
      // Verificar que el checkbox quedó marcado
      cy.get('[data-test^="brand-"]').first().should('be.checked');
    });
  
  });
  