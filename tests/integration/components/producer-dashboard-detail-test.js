import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('producer-dashboard-detail', 'Integration | Component | producer dashboard detail', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{producer-dashboard-detail}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#producer-dashboard-detail}}
      template block text
    {{/producer-dashboard-detail}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
