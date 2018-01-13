import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reviews-data-table', 'Integration | Component | reviews data table', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reviews-data-table}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#reviews-data-table}}
      template block text
    {{/reviews-data-table}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
