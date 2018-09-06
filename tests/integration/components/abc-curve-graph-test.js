import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('abc-curve-graph', 'Integration | Component | abc curve graph', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{abc-curve-graph}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#abc-curve-graph}}
      template block text
    {{/abc-curve-graph}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
