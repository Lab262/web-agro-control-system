import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('charts/line-chart-classic', 'Integration | Component | charts/line chart classic', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{charts/line-chart-classic}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#charts/line-chart-classic}}
      template block text
    {{/charts/line-chart-classic}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
