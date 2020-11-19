<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item :to="{ name: 'index' }" active>Home</b-nav-item>
        <b-nav-item :to="{ name: 'personas' }">Personas</b-nav-item>

        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item href="#">Account</b-dropdown-item>
          <b-dropdown-item href="#">Settings</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
    <div>
      <div>
        <h4>Top and Bottom</h4>
        <b-card-group deck>
          <b-card
            img-src="https://placekitten.com/1000/300"
            img-alt="Card image"
            img-top
          >
            <b-card-text>
              Some quick example text to build on the card and make up the bulk
              of the card's content.
            </b-card-text>
          </b-card>

          <b-card
            img-src="https://placekitten.com/1000/300"
            img-alt="Card image"
            img-bottom
          >
            <b-card-text>
              Some quick example text to build on the card and make up the bulk
              of the card's content.
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>
      <div class="mt-4">
        <h4>Left and Right (or Start and End)</h4>
        <b-card
          img-src="https://placekitten.com/300/300"
          img-alt="Card image"
          img-left
          class="mb-3"
        >
          <b-card-text>
            Some quick example text to build on the card and make up the bulk of
            the card's content.
          </b-card-text>
        </b-card>

        <b-card
          img-src="https://placekitten.com/300/300"
          img-alt="Card image"
          img-right
        >
          <b-card-text>
            Some quick example text to build on the card and make up the bulk of
            the card's content.
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

