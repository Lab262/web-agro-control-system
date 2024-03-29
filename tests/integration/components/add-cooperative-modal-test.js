import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('add-cooperative-modal', 'Integration | Component | add cooperative modal', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{add-cooperative-modal}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#add-cooperative-modal}}
      template block text
    {{/add-cooperative-modal}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
