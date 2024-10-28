1. Vue.js là gì? Tổng quan về các cơ chế quan trọng
Vue.js là một framework JavaScript dùng để xây dựng giao diện người dùng (UI), đặc biệt là các ứng dụng web đơn trang (SPA). Vue có các cơ chế quan trọng như:

Reactive Data Binding: Liên kết dữ liệu động giữa giao diện và dữ liệu.
Component-based Architecture: Ứng dụng được chia nhỏ thành các thành phần tái sử dụng.
Directives: Cú pháp đặc biệt giúp quản lý DOM, như v-for, v-if, v-model.

2. Sự khác nhau giữa ref và reactive
ref: Được dùng để quản lý các giá trị nguyên thủy và non-reactive. Cú pháp: const count = ref(0);.
reactive: Dùng để làm reactive một đối tượng phức tạp. Cú pháp: const state = reactive({ name: "John" });.
Khi nào sử dụng:
Sử dụng ref khi làm việc với giá trị nguyên thủy hoặc muốn quản lý trạng thái đơn giản.
Sử dụng reactive cho đối tượng phức tạp và cấu trúc lồng nhau.

3. Props là gì? Các bước truyền Props
Props: Là cơ chế để truyền dữ liệu từ component cha sang component con.
Các bước truyền:
Khai báo props trong component con.
Truyền giá trị từ component cha thông qua thuộc tính trên component con.

4. Emit là gì? Các bước truyền Emit
Emit: Là cách để component con gửi sự kiện ngược lại cho component cha.
Các bước truyền:
Trong component con, sử dụng this.$emit('event-name', data) để emit sự kiện.
Trong component cha, bắt sự kiện bằng cách sử dụng @event-name="handler".
5. Quy tắc đặt tên và sử dụng component trong Vue.js
Tên component nên tuân theo kiểu PascalCase hoặc kebab-case.
Component được sử dụng thông qua thẻ HTML với cú pháp <component-name />.

6. Luồng hoạt động của thư viện Vuex
Vuex là một hệ thống quản lý trạng thái tập trung. Luồng hoạt động cơ bản:
Gọi Actions để thực hiện logic bất đồng bộ.
Actions gọi Mutations để thay đổi State.
State được phản ánh trong giao diện.

7. Các thành phần của Vuex và chức năng của chúng
State: Lưu trữ trạng thái của ứng dụng.
Mutations: Thay đổi trạng thái.
Actions: Xử lý logic bất đồng bộ.
Getters: Trích xuất và tính toán dữ liệu từ state.
Modules: Chia nhỏ store thành các module độc lập.

8. Vai trò của state, actions, mutations, modules, getters trong Vuex
State: Nơi lưu trữ dữ liệu.
Actions: Xử lý logic bất đồng bộ và gọi mutations.
Mutations: Thay đổi dữ liệu trong state.
Modules: Phân chia store thành các phần nhỏ để dễ quản lý.
Getters: Trích xuất dữ liệu từ state và có thể tính toán lại.

9. Các bước cấu hình thư viện Vue Router
Cài đặt Vue Router.
Định nghĩa các route.
Tạo instance Vue Router.
Thêm router vào Vue instance.

10. Các phương thức trong Vue Router
useRouter(): Trả về instance của router để điều hướng.
useRoute(): Trả về thông tin về route hiện tại.

11. Slot trong Vue được dùng để làm gì?
Slot cho phép component cha chèn nội dung vào component con một cách linh hoạt.

12. Chức năng của thuộc tính scoped trong style
Scoped: Hạn chế phạm vi ảnh hưởng của CSS chỉ trong component đó.

13. Một component trong Vue.js gồm bao nhiêu thành phần chính?
Gồm 3 thành phần chính: template, script, và style.

14. Lifecycle trong Vue là gì?
Là các giai đoạn từ khi component được tạo, cập nhật, cho đến khi bị hủy. Các giai đoạn:
Creation: beforeCreate, created.
Mounting: beforeMount, mounted.
Updating: beforeUpdate, updated.
Unmounting: beforeUnmount, unmounted.

15. Các phương thức tương ứng với từng giai đoạn trong vòng đời của Vue
Creation: beforeCreate(), created().
Mounting: beforeMount(), mounted().
Updating: beforeUpdate(), updated().
Unmounting: beforeUnmount(), unmounted().

16. Sự khác nhau giữa One-way và Two-way Data Binding
One-way Binding: Dữ liệu chỉ di chuyển từ model đến view.
Two-way Binding: Dữ liệu di chuyển hai chiều giữa model và view (ví dụ: v-model).

17. Sự khác nhau giữa Watchers và Computed
Watchers: Theo dõi sự thay đổi của một biến và thực hiện hành động khi thay đổi.
Computed: Tính toán giá trị dựa trên các biến khác và chỉ tính toán lại khi các biến thay đổi.

18. Các cách để binding property
Binding một chiều: Sử dụng v-bind.
Two-way binding: Sử dụng v-model.

19. Các cách để lắng nghe sự kiện trong Vue
Sử dụng v-on hoặc @ để lắng nghe sự kiện từ DOM hoặc component.

20. Các trường hợp trong condition rendering
Sử dụng v-if, v-else, v-else-if để điều kiện hiển thị phần tử.

21. Cú pháp Two-way Data Binding
Sử dụng v-model để tạo binding hai chiều giữa input và state.

22. Khi dùng v-model với input type text, checkbox và radio
Text: Trả về chuỗi ký tự.
Checkbox: Trả về giá trị true hoặc false.
Radio: Trả về giá trị được chọn từ các lựa chọn radio.





