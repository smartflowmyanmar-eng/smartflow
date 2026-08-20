# SmartFlow live CRM test findings

Source URL: https://smartflowmyanmar-eng.github.io/smartflow/?live-test=1

The live page authenticated successfully as the Admin user `myokhine060` and displayed the Admin dashboard. The dashboard reported Supabase connected, with 0 customers, 0 orders, and 0 open follow-ups before test entry. The UI exposed Overview, Customers, Orders, Follow-up Queue, Analytics, Settings, refresh, export, notifications, and New Customer actions.

A clearly marked QA-only customer form was opened. The entered record was: name `TEST Customer QA`, company `SmartFlow QA Test`, phone `09000000000`, email `qa-test@smartflow.local`, channel default Messenger, tag `TEST`, and note `QA test record for verifying Supabase persistence. Please archive after testing.` The record has not yet been submitted; the form remained open after filling.

The live UI currently displays empty-state analytics and workflow sections until records are persisted. No customer/order/follow-up test record was inserted through SQL.


## Orders view

URL after navigation: https://smartflowmyanmar-eng.github.io/orders

The authenticated Orders view loaded successfully with Supabase connected. It shows 0 recorded orders, search, status filter options (all/new/in progress/confirmed/completed), and two `New Order` actions. The empty state instructs the admin to create an order after customer contact is confirmed. No order has been inserted yet. The QA customer is visible in the global count (1 customer, 1 open follow-up).

The first save attempt initially failed with `permission denied for function is_smartflow_admin`; the database grant was then repaired by granting execute on `public.is_smartflow_admin()` to `authenticated` and `service_role`, revoking `anon/public`, and setting a safe search_path. A fresh dashboard load afterward showed the QA customer persisted and one open follow-up, confirming the customer write succeeded after the fix.


## QA order workflow result

Source URL: https://smartflowmyanmar-eng.github.io/orders

After repairing the authenticated execute grant for `public.is_smartflow_admin()`, the live Admin UI saved `QA-ORDER-20260820` for customer `myo · smartflow`, channel Messenger, amount 25,000 K, default status New. The UI displayed `Order ထည့်ပြီးပါပြီ။`; the Orders count changed from 0 to 1 and the table showed the saved order. This confirms the order insert and reload path works through the live UI and Supabase connection.


## Follow-up Queue

Source URL: https://smartflowmyanmar-eng.github.io/followups

The live Follow-up Queue loaded successfully. It shows one open follow-up for the QA customer `myo · smartflow`, while the recent activity panel is empty because no activity record has been created yet. The customer card exposes a follow-up action, so the queue read path is working and is linked to the customer data.


## Follow-up action gap

The customer drawer opens correctly and shows the follow-up status badge, but it does not expose a form to create or edit a `follow_ups` record. The visible actions are Edit and Archive only. The Follow-up Queue is therefore currently a read/derived view; a dedicated follow-up create/update control remains a feature gap even though the `follow_ups` table exists in Supabase.
