describe("Mobile Presentation View", () => {
  beforeEach(() => {
    // Set mobile viewport (315x579)
    cy.viewport(315, 579);
    cy.visit("/");
    // Wait for content to load
    cy.get(".mobile-presentation-wrapper").should("exist");
  });

  describe("Sticky toolbar positioning", () => {
    it("should have sticky positioning applied to toolbar wrapper", () => {
      cy.get(".mobile-toolbar-sticky").then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        expect(styles.position).to.equal("sticky");
        expect(styles.top).to.equal("0px");
      });
    });

    it("should NOT have fixed positioning on toolbar when isSticky prop is true", () => {
      cy.get(".mobile-toolbar-sticky .toolbar-container").then(($el) => {
        const styles = window.getComputedStyle($el[0]);
        // When isSticky=true, the toolbar should NOT be fixed
        expect(styles.position).to.not.equal("fixed");
      });
    });
  });

  describe("Toolbar visibility", () => {
    it("should render toolbar at the top on initial load", () => {
      // Toolbar should exist
      cy.get(".mobile-toolbar-sticky").should("exist");
      cy.get(".mobile-toolbar-sticky .toolbar-container").should("exist");

      // Toolbar should be visible (not hidden)
      cy.get(".mobile-toolbar-sticky").should("be.visible");

      // Toolbar should be at the top of the viewport
      cy.get(".mobile-toolbar-sticky").then(($toolbar) => {
        const rect = $toolbar[0].getBoundingClientRect();
        // Should be at or near top (within 20px to account for padding)
        expect(rect.top).to.be.lessThan(20);
      });
    });

    it("should have toolbar visible within viewport bounds", () => {
      cy.get(".mobile-toolbar-sticky").then(($toolbar) => {
        const rect = $toolbar[0].getBoundingClientRect();
        // Toolbar should be within horizontal viewport bounds
        expect(rect.left).to.be.at.least(0);
        expect(rect.right).to.be.at.most(315);
        // Toolbar should not be off-screen vertically
        expect(rect.top).to.be.at.least(-10);
        expect(rect.bottom).to.be.at.most(579);
      });
    });

    it("should remain at top of viewport after scrolling down", () => {
      // First verify we can scroll (content is taller than viewport)
      cy.get(".mobile-presentation").invoke("height").should("be.greaterThan", 579);

      // Scroll down 500px
      cy.scrollTo(0, 500);
      cy.wait(300);

      // Toolbar should still be at the top (check bounding rect position)
      cy.get(".mobile-toolbar-sticky").then(($toolbar) => {
        const rect = $toolbar[0].getBoundingClientRect();
        // After scroll, sticky element should still be at top of viewport
        expect(rect.top).to.be.lessThan(20);
        expect(rect.height).to.be.greaterThan(0);
      });
    });

    it("should remain at top of viewport after scrolling to bottom", () => {
      // Scroll to bottom
      cy.scrollTo("bottom");
      cy.wait(300);

      // Toolbar should still be at the top
      cy.get(".mobile-toolbar-sticky").then(($toolbar) => {
        const rect = $toolbar[0].getBoundingClientRect();
        expect(rect.top).to.be.lessThan(20);
        expect(rect.height).to.be.greaterThan(0);
      });
    });
  });

  describe("Navigation buttons", () => {
    it("should show Next button on first slide", () => {
      // First slide should have Next button
      cy.get("#mobile-slide-0 .mobile-slide-next").should("exist").and("be.visible");
      cy.get("#mobile-slide-0 .mobile-slide-next").should("contain.text", "Next");
    });

    it("should show slide number on first slide instead of Prev", () => {
      // First slide should NOT have Prev button, but should have slide number
      cy.get("#mobile-slide-0 .mobile-slide-prev").should("not.exist");
      cy.get("#mobile-slide-0 .mobile-slide-number").should("exist");
    });

    it("should navigate to next slide when clicking Next", () => {
      // Click next on first slide
      cy.get("#mobile-slide-0 .mobile-slide-next").click();
      cy.wait(500); // Wait for smooth scroll

      // Second slide should now be near top of viewport
      cy.get("#mobile-slide-1").then(($slide) => {
        const rect = $slide[0].getBoundingClientRect();
        // Slide should be near top (accounting for toolbar height)
        expect(rect.top).to.be.lessThan(100);
      });
    });

    it("should show Prev button on slides after the first", () => {
      // Navigate to second slide
      cy.get("#mobile-slide-0 .mobile-slide-next").click();
      cy.wait(500);

      // Second slide should have Prev button
      cy.get("#mobile-slide-1 .mobile-slide-prev").should("exist").and("be.visible");
      cy.get("#mobile-slide-1 .mobile-slide-prev").should("contain.text", "Prev");
    });

    it("should navigate to previous slide when clicking Prev", () => {
      // Navigate to second slide first
      cy.get("#mobile-slide-0 .mobile-slide-next").click();
      cy.wait(500);

      // Click prev
      cy.get("#mobile-slide-1 .mobile-slide-prev").click();
      cy.wait(500);

      // First slide should be near top
      cy.get("#mobile-slide-0").then(($slide) => {
        const rect = $slide[0].getBoundingClientRect();
        expect(rect.top).to.be.lessThan(100);
      });
    });
  });

  describe("Toolbar functionality", () => {
    it("should have working theme toggle buttons", () => {
      // Click dark mode
      cy.get(".mobile-toolbar-sticky button[title='Dark mode']").click();
      cy.get("html").should("have.class", "dark");

      // Click light mode
      cy.get(".mobile-toolbar-sticky button[title='Light mode']").click();
      cy.get("html").should("not.have.class", "dark");
    });

    it("should switch to reading mode when clicking Read button", () => {
      cy.get(".mobile-toolbar-sticky .mode-toggle button[title='Reading mode']").click();
      // Should switch to reading mode (mobile presentation should no longer exist)
      cy.get(".mobile-presentation-wrapper").should("not.exist");
      cy.get(".markdown-content").should("exist");
    });
  });
});
