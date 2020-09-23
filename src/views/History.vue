<template>
  <div>
    <Navbar type="history" @sidemenutoggle="sideMenuToggle" />
    <div class="main-content">
      <SideMenu type="history" class="side-toggle" />
      <div class="history-content">
        <div class="history-card">
          <div class="content">
            <div class="content-text">
              <p>Today's Income</p>
              <p>Rp. 1.000.000</p>
              <p>+2% yesterday</p>
            </div>
            <img src="../assets/elips/pinkviolet.png" alt="elips" />
          </div>
          <div class="content">
            <div class="content-text">
              <p>Orders</p>
              <p>3270</p>
              <p>+5% last week</p>
            </div>
            <img src="../assets/elips/blue.png" alt="elips" />
          </div>
          <div class="content">
            <div class="content-text">
              <p>This Years Income</p>
              <p>Rp. 100.000.000</p>
              <p>+10% Last Year</p>
              <img src="../assets/elips/pinkviolet.png" alt="elips" />
            </div>
          </div>
        </div>
        <div class="table">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Invoices</th>
                <th scope="col">Cashier</th>
                <th scope="col">Date</th>
                <th scope="col">Orders</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in historyMasterData" :key="index">
                <th scope="row">{{ item.invoices }}</th>
                <td>{{ item.cashier }}</td>
                <td>{{ item.date }}</td>
                <td>
                  <button
                    class="btn btn-primary"
                    @click="historyDetail(item.id)"
                    data-toggle="modal"
                    data-target="#detail-button"
                  >
                    detail
                  </button>
                </td>
                <td>Rp. {{ item.amount }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-detail">
          <!-- Modal -->
          <div
            class="modal fade"
            id="detail-button"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Modal title
                  </h5>
                </div>
                <div class="modal-body">
                  <div class="data-detail font-weight-bold" v-for="(item, index) in detailHistory" :key="index">
                    <p>{{item.product_name}}</p>
                    <p>{{item.qty}}</p>
                    <p>Rp. {{item.price}}</p>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenu from '../components/SideMenu'
import Navbar from '../components/Navbar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'History',
  components: {
    SideMenu,
    Navbar
  },
  data () {
    return {
      detailHistory: null
    }
  },
  computed: {
    ...mapGetters({
      historyData: 'history/getHistoryData',
      historyMasterData: 'history/getHistoryMaster'
    })
  },
  methods: {
    ...mapActions({
      dataHistory: 'history/historyFind',
      historyMaster: 'history/historyMaster'
    }),
    sideMenuToggle () {
      const sideMenu = document.querySelector('.side-toggle')
      sideMenu.classList.toggle('side-menu-toggle')
    },
    historyDetail (id) {
      const detail = this.historyData.filter((e) => e.id_history === id)
      this.detailHistory = detail
    }
  },
  mounted () {
    this.dataHistory()
    this.historyMaster()
  }
}
</script>

<style scoped>
.side-toggle {
  position: absolute;
  left: -100px;
  transition: all 0.3s ease;
  z-index: 2;
}
.history-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  padding: 30px;
  font-weight: bold;
}
.content {
  height: 150px;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
}
.content img {
  position: absolute;
  right: 0;
  top: 0;
}
.content:nth-child(1) {
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  border-radius: 10px;
}
.content:nth-child(2) {
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
  border-radius: 10px;
}
.content:nth-child(3) {
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
}
.data-detail {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
}
/* event */
.side-menu-toggle {
  left: 0;
}
</style>
