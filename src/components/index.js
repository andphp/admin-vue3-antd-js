import CardBase from "./cardBase";
import Count from "./count";
import Table from "./table";
import Query from "./query";
import Tree from "./tree";
import Form from "./form";
import Modal from "./modal";

const components = [CardBase, Count, Table, Query, Tree, Form, Modal];

const install = function(Vue) {
  if (install.installed) return;
  components.map((component) => Vue.component(component.name, component));
};

export default {
  install,
  CardBase,
  Count,
  Table,
  Query,
  Tree,
  Form,
  Modal,
};
