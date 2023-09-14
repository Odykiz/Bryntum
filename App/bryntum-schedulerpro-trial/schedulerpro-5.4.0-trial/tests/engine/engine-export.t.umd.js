/* eslint-disable no-undef */
//This test is only for module/umd testing and doesn't require imports

StartTest(t => {

    t.it('Scheduler Pro Engine classes are exported from bundle', t => {
        t.ok(SchedulerProProjectMixin, 'SchedulerProProjectMixin is exported');
        t.ok(ConstrainedEarlyEventMixin, 'ConstrainedEarlyEventMixin is exported');
        t.ok(HasDateConstraintMixin, 'HasDateConstraintMixin is exported');
        t.ok(HasPercentDoneMixin, 'HasPercentDoneMixin is exported');
        t.ok(ScheduledByDependenciesEarlyEventMixin, 'ScheduledByDependenciesEarlyEventMixin is exported');
        t.ok(SchedulerProAssignmentMixin, 'SchedulerProAssignmentMixin is exported');
        t.ok(SchedulerProDependencyMixin, 'SchedulerProDependencyMixin is exported');
        t.ok(SchedulerProEvent, 'SchedulerProEvent is exported');
        t.ok(SchedulerProHasAssignmentsMixin, 'SchedulerProHasAssignmentsMixin is exported');
        t.ok(SchedulerProResourceMixin, 'SchedulerProResourceMixin is exported');
    });

});
